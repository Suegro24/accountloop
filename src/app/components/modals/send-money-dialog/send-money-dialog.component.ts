import { Component, OnInit, Inject } from '@angular/core';
import { Income } from '../../../models/income';
import { UserService } from 'src/app/services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirmService } from 'src/app/services/firm.service';

@Component({
  selector: 'app-send-money-dialog',
  templateUrl: './send-money-dialog.component.html',
  styleUrls: ['./send-money-dialog.component.scss']
})
export class SendMoneyDialogComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('user'));
  firm;
  paymentModel = new Income('', null, null, 'Przelew', '', 'Waiting', '', '');

  constructor(private userService: UserService, private firmService: FirmService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.userService.getUser(this.user._id).subscribe(res => {
      this.user = res;
    })

    if (this.data.type == 'firm') {
      this.firmService.getFirm(this.data._id).subscribe(res => {
        this.firm = res;
      })
    }
  }

  sendPayment() {

    this.paymentModel.date = new Date();

    this.paymentModel.type = 'expense';
    this.user.budget.expense.push(this.paymentModel);
    this.userService.changeBudgetUser(this.user._id,this.user).subscribe();

    this.paymentModel.type = 'income';
    this.paymentModel.senderId = this.user._id;
    

    if (this.data.type == 'user') {
      this.data.target.budget.income.push(this.paymentModel);
      if (!this.data.target.awaitingPaymentsToAccept) this.data.target.awaitingPaymentsToAccept = 1;
      else this.data.target.awaitingPaymentsToAccept++;
      this.userService.editUser(this.data.target._id,this.data.target).subscribe();
      console.log(this.data.target);
    }
    else {
      this.data.target.firmBudget.income.push(this.paymentModel);
      this.firmService.editFirm(this.data.target._id, this.data.target).subscribe();
    }

  }

}
