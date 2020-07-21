import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { SendMoneyDialogComponent } from 'src/app/components/modals/send-money-dialog/send-money-dialog.component';
import { FirmService } from 'src/app/services/firm.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-money-transfer',
  templateUrl: './money-transfer.component.html',
  styleUrls: ['./money-transfer.component.scss']
})
export class MoneyTransferComponent implements OnInit {

  user;
  users;
  firms;
  searchedUser: string;
  searchedFirm: string;
  awaitingPayments;

  constructor(private userService: UserService, private firmService: FirmService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.refreshList();

    this.userService.getUsers().subscribe(res => {
      this.users = res;
      this.users = this.users.filter(user => {
        return user._id != this.user._id;
      })
    })

    this.firmService.getFirms().subscribe(res => {
      this.firms = res;
    })
  }

  refreshList() {
    this.userService.getUser(this.user._id).subscribe(res => {
      this.user = res;

      this.awaitingPayments = [...this.user.budget.income];

      this.awaitingPayments = this.awaitingPayments.filter(payment => {
        return payment.status == 'Waiting';
      })
      this.awaitingPayments = this.awaitingPayments.filter(payment => 
        !this.user.disabledUser.filter(user => user === payment.senderId).length
      );

      this.awaitingPayments.forEach(payment => {
        this.userService.getUser(payment.senderId).subscribe(res => {
          payment.sender = res.name + ' ' + res.surname;
          payment.senderImage = res.photo;
        })
      });
    })
  }

  sendMoney(target, type) {
    let blockedUser = false;

    target.disabledUser.map(user => {
      if (user == this.user._id) {
        blockedUser = true;
        this.snackBar.open('Użytkownik docelowy zablokował Ci możliwość wysyłania pieniędzy', 'OK', {
          duration: 5000,
          horizontalPosition: 'right',
        });
        return;
      }
    })
    if (!blockedUser) {
      let ref = this.dialog.open(SendMoneyDialogComponent, {
        data: {
          target: target,
          type: type
        }
      });
    }


  }

  acceptMoney(payment) {
    this.user.awaitingPaymentsToAccept--;
    this.user.budget.income.map(income => {
      if (income._id == payment._id) {
        income.status = 'Accepted';
        return;
      }
    })
    this.userService.editUser(this.user._id, this.user).subscribe(() => {
      this.refreshList();
    });
  }

  discardMoney(payment) {
    this.user.awaitingPaymentsToAccept--;
    //Deleting income for current user
    this.user.budget.income.map((income,index) => {
      if (income._id == payment._id) {
        this.user.budget.income.splice(index,1);
        return;
      }
    })

    this.userService.changeBudgetUser(this.user._id, this.user).subscribe(() => {
      this.refreshList();
    });
    //Deleting expense for sending user
    let sender;

    this.userService.getUser(payment.senderId).subscribe(res => {
      sender = res;
      sender.budget.expense.map((expense,index) => {
        if (expense._id == payment._id) {
          sender.budget.expense.splice(index,1);

          this.userService.editUser(sender._id, sender).subscribe(() => {
            this.refreshList();
          })
        }
      })
    })
  }

  disableUser(payment) {
    if (!this.user.disabledUser) this.user.disabledUser = [];
    this.user.disabledUser.push(payment.senderId);
    this.awaitingPayments.map(p => {
      if (p.senderId == payment.senderId) this.discardMoney(p);
    })
    this.userService.editUser(this.user._id, this.user).subscribe();
  }

}
