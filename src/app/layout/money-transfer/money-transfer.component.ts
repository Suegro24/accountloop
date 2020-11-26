import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { SendMoneyDialogComponent } from 'src/app/components/modals/send-money-dialog/send-money-dialog.component';
import { FirmService } from 'src/app/services/firm.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { Income } from 'src/app/models/income';
import { Expense } from 'src/app/models/expense';
import { Budget } from 'src/app/models/budget';

@Component({
  selector: 'app-money-transfer',
  templateUrl: './money-transfer.component.html',
  styleUrls: ['./money-transfer.component.scss']
})
export class MoneyTransferComponent implements OnInit {

  user;
  userId = localStorage.getItem('user');
  users;
  firms;
  searchedUser: string;
  searchedFirm: string;
  awaitingPayments;
  paymentModel = new Income('Przelew własny', null, null, {name: 'Przelew', icon: '', matches: []}, '', 'Accepted', '', '', '', '');

  constructor(private userService: UserService, private firmService: FirmService, public dialog: MatDialog,
              private snackBar: MatSnackBar, private router: Router, private eventEmitterService: EventEmitterService) { }

  ngOnInit(): void {
    this.refreshList();

    this.userService.getUsers().subscribe(res => {
      this.users = res;
      this.users = this.users.filter(user => {
        return user._id !== this.userId;
      });
    });

    this.firmService.getFirms().subscribe(res => {
      this.firms = res;
    });
  }

  refreshList() {
    this.userService.getUser(this.userId).subscribe(res => {
      this.user = res;

      this.awaitingPayments = [...this.user.budget.income];

      this.awaitingPayments = this.awaitingPayments.filter(payment => {
        return payment.status === 'Waiting';
      });
      this.awaitingPayments = this.awaitingPayments.filter(payment =>
        !this.user.disabledUser.filter(user => user === payment.senderId).length
      );

      this.awaitingPayments.forEach(payment => {
        this.userService.getUser(payment.senderId).subscribe(response => {
          payment.sender = response.name + ' ' + response.surname;
          payment.senderImage = response.photo;
        });
      });
    });
  }

  sendMoney(target, type) {
    let blockedUser = false;

    target.disabledUser.map(user => {
      if (user === this.userId) {
        blockedUser = true;
        this.userService.playNotificationsSound();
        this.snackBar.open('Użytkownik docelowy zablokował Ci możliwość wysyłania pieniędzy', 'OK', {
          duration: 5000,
          horizontalPosition: 'right',
          panelClass: ['snackbar-warn']
        });
        return;
      }
    });

    if (target.settings.allowReceivingTransfers === false) {
      this.userService.playNotificationsSound();
      this.snackBar.open('Użytkownik docelowy zablokował możliwość wysyłania przelewów', 'OK', {
        duration: 5000,
        horizontalPosition: 'right',
        panelClass: ['snackbar-warn']
      });
      return;
    }

    if (!blockedUser) {
      const ref = this.dialog.open(SendMoneyDialogComponent, {
        data: {
          target,
          type,
          senderName: this.user.name + ' ' + this.user.surname
        }
      });
      ref.afterClosed().subscribe(res => {
        if (res === true) {
          this.userService.playNotificationsSound();
          this.snackBar.open('Udało się wysłać przelew', 'OK', {
            panelClass: ['snackbar-success'],
            duration: 5000,
            horizontalPosition: 'right',
          });
        }
        else {
          this.userService.playNotificationsSound();
          this.snackBar.open('Nie powiodło się wysyłanie przelewu', 'OK', {
            panelClass: ['snackbar-warn'],
            duration: 5000,
            horizontalPosition: 'right'
          });
        }
      });
    }
  }

  sendMoneyToFirmAccount() {

    if (this.user.settings.isBudgetNegativeValueAllowed === false &&
      this.user.budget.money - this.paymentModel.money < 0 ) {
        this.userService.playNotificationsSound();
        this.snackBar.open('Nie powiodło się wysyłanie przelewu, konto nie może być ujemne', 'OK', {
          panelClass: ['snackbar-warn'],
          duration: 5000,
          horizontalPosition: 'right'
        });
        return;
      }

    this.paymentModel.date = new Date();

    const expense = new Expense('', 0, null, {name: 'Przelew', icon: '', matches: []}, 'expense', '', '');
    expense.name = this.paymentModel.name;
    expense.money = this.paymentModel.money;
    expense.date = this.paymentModel.date;
    expense.type = 'expense';
    expense.status = 'Accepted';
    this.user.budget.expense.push(expense);

    this.paymentModel.type = 'income';
    this.paymentModel.senderId = this.user._id;

    if (!this.user.firmBudget) { this.user.firmBudget = new Budget(0, [], []); }
    this.user.firmBudget.income.push(this.paymentModel);
    this.userService.editUser(this.userId, this.user).subscribe(res => {
      this.userService.playNotificationsSound();
      this.snackBar.open('Udało się wysłać pieniądze', 'OK', {
        panelClass: ['snackbar-success'],
        duration: 5000,
        horizontalPosition: 'right'
      });
    });
  }

  acceptMoney(payment) {
    this.user.awaitingPaymentsToAccept--;
    this.user.budget.income.map(income => {
      if (income._id === payment._id) {
        income.status = 'Accepted';
        return;
      }
    });
    this.userService.editUser(this.userId, this.user).subscribe(() => {
      this.refreshList();
    });
    this.eventEmitterService.invokeSidenavRefreshListFunction();
  }

  discardMoney(payment) {
    this.user.awaitingPaymentsToAccept--;
    // Deleting income for current user
    this.user.budget.income.map((income, index) => {
      if (income._id === payment._id) {
        this.user.budget.income.splice(index, 1);
        return;
      }
    });

    this.userService.changeBudgetUser(this.userId, this.user).subscribe(() => {
      this.refreshList();
    });
    // Deleting expense for sending user
    let sender;

    this.userService.getUser(payment.senderId).subscribe(res => {
      sender = res;
      sender.budget.expense = sender.budget.expense.filter((expense) => {
        if (expense._id !== payment.expenseRef) { return expense; }
      });
      this.userService.editUser(sender._id, sender).subscribe(() => {
        this.refreshList();
      });
    });
    this.eventEmitterService.invokeSidenavRefreshListFunction();
  }

  disableUser(payment) {
    if (!this.user.disabledUser) { this.user.disabledUser = []; }
    this.user.disabledUser.push(payment.senderId);
    this.awaitingPayments.map(p => {
      if (p.senderId === payment.senderId) { this.discardMoney(p); }
    });
    this.userService.editUser(this.userId, this.user).subscribe(() => {
      this.refreshList();
    });
    this.eventEmitterService.invokeSidenavRefreshListFunction();
  }

  goToProfile(id) {
    this.router.navigate(['/profil'], {queryParams: {id}});
  }

}
