import { Component, OnInit, Inject } from '@angular/core';
import { Expense } from 'src/app/models/expense';
import { UserService } from 'src/app/services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Budget } from 'src/app/models/budget';
import { FirmService } from 'src/app/services/firm.service';

@Component({
  selector: 'app-add-expense-modal',
  templateUrl: './add-expense-modal.component.html',
  styleUrls: ['./add-expense-modal.component.scss']
})
export class AddExpenseModalComponent implements OnInit {

  user: any = [];
  firm;
  expenseModel = new Expense('', 0, null, '', 'expense','');

  constructor(private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: any, private firmService: FirmService) { }

  ngOnInit(): void {
      this.userService.getUser(this.data.id).subscribe(res => {
        this.user = res;
        if (!this.user.budget) this.user.budget = new Budget(null, [], []);
      })
    
    if (this.data.budgetType == 'firm') {
      this.firmService.getFirm(this.data.firmId).subscribe(res => {
        this.firm = res;
      })
    }

  }

  addExpense() {
    if (this.data.budgetType == 'user') {
      this.user.budget.expense.push(this.expenseModel);
      this.userService.changeBudgetUser(this.user._id, this.user).subscribe();
    }
    else {
      if (this.user.firmStatus > 1) this.expenseModel.status = 'Zaakceptowane';
      else this.expenseModel.status = 'Oczekujące';
      this.firm.firmBudget.expense.push(this.expenseModel);
      this.firmService.editFirm(this.firm._id, this.firm).subscribe();
    }
  }

}
