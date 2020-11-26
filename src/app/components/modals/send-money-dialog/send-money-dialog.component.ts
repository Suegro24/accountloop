import { Component, OnInit, Inject } from '@angular/core';
import { Income } from '../../../models/income';
import { UserService } from 'src/app/services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FirmService } from 'src/app/services/firm.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddExpenseModalComponent } from '../add-expense-modal/add-expense-modal.component';
import { Expense } from 'src/app/models/expense';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-send-money-dialog',
  templateUrl: './send-money-dialog.component.html',
  styleUrls: ['./send-money-dialog.component.scss']
})
export class SendMoneyDialogComponent implements OnInit {

  userId = localStorage.getItem('user');
  user;
  firm;
  paymentModel = new Income('', null, null, {name: 'Przelew', icon: '', matches: []}, '', 'Waiting', '', '', '', '');
  categories;
  category;

  constructor(private userService: UserService, private firmService: FirmService, @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar, public dialogRef: MatDialogRef<AddExpenseModalComponent>,
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.userService.getUser(this.userId).subscribe(res => {
      this.user = res;
    });
    this.categoryService.getAllCategories().subscribe(res => {
      this.categories = res;
      this.category = this.categories.filter(category => {
        if (category.name === 'Przelew') { return category; }
      });
    });

    if (this.data.type === 'firm') {
      this.firmService.getFirm(this.data._id).subscribe(res => {
        this.firm = res;
      });
    }
  }

  sendPayment() {

    this.paymentModel.date = new Date();

    const expense = new Expense('', 0, null, {name: 'Przelew', icon: '', matches: []}, 'expense', '', '');
    expense.recipientName = this.data.target.name + ' ' + this.data.target.surname;
    expense.name = this.paymentModel.name;
    expense.money = this.paymentModel.money;
    expense.date = this.paymentModel.date;
    expense.type = 'expense';
    expense.status = 'Waiting';
    this.user.budget.expense.push(expense);

    this.paymentModel.type = 'income';
    this.paymentModel.senderId = this.user._id;
    this.paymentModel.senderName = this.data.senderName;

    if (this.data.type === 'user') {

      if ((this.user.settings.isBudgetNegativeValueAllowed === false && this.user.budget.money - this.paymentModel.money < 0 )
          || this.data.target.settings.allowReceivingTransfers === false) {
            this.dialogRef.close(false);
      }

      this.data.target.budget.income.push(this.paymentModel);
      if (!this.data.target.awaitingPaymentsToAccept) { this.data.target.awaitingPaymentsToAccept = 1; }
      else { this.data.target.awaitingPaymentsToAccept++; }

      this.userService.sendMoney(this.user._id, expense, this.data.target._id, this.paymentModel).subscribe();
    }
    else {
      this.data.target.firmBudget.income.push(this.paymentModel);
      this.firmService.editFirm(this.data.target._id, this.data.target).subscribe();
    }
    this.dialogRef.close(true);
  }

}
