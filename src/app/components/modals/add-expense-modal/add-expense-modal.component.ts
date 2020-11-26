import { Component, OnInit, Inject } from '@angular/core';
import { Expense } from 'src/app/models/expense';
import { UserService } from 'src/app/services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Budget } from 'src/app/models/budget';
import { FirmService } from 'src/app/services/firm.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-expense-modal',
  templateUrl: './add-expense-modal.component.html',
  styleUrls: ['./add-expense-modal.component.scss']
})
export class AddExpenseModalComponent implements OnInit {

  user: any = [];
  firm;
  expenseModel = new Expense('', 0, null, null, 'expense', 'Accepted', '');
  categories: any = [];
  defaultCategory: any;

  constructor(private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: any, private firmService: FirmService,
              public dialogRef: MatDialogRef<AddExpenseModalComponent>, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.userService.getUser(this.data.id).subscribe(res => {
      this.user = res;
      if (!this.user.budget) { this.user.budget = new Budget(null, [], []); }
    });
    if (this.data.budgetType === 'firm') {
    this.firmService.getFirm(this.data.firmId).subscribe(res => {
      this.firm = res;
    });
  }

    this.categoryService.getAllCategories().subscribe(res => {
    this.categories = res;
    this.expenseModel.category = res[0];
  });
  }

  addExpense() {
    if (this.user.settings.isBudgetNegativeValueAllowed === false && this.user.budget.money - this.expenseModel.money < 0) {
      this.dialogRef.close(2);
      return;
    }
    if (this.data.budgetType === 'user') {
      this.user.budget.expense.push(this.expenseModel);
      this.userService.changeBudgetUser(this.user._id, this.user).subscribe();
    }
    else {
      if (this.user.firmStatus > 1) { this.expenseModel.status = 'Accepted'; }
      else { this.expenseModel.status = 'Waiting'; }
      this.firm.firmBudget.expense.push(this.expenseModel);
      this.firmService.editFirm(this.firm._id, this.firm).subscribe();
    }
    this.manageCategory();
    this.dialogRef.close(0);
  }

  manageCategory() {
    this.categoryService.getCategory(this.expenseModel.category.name).subscribe(res => {
      const words = this.expenseModel.name.toLowerCase().split(' ');
      words.map(word => {
        res.matches.map(match => {
          if (match.name === word) {
            match.amount++;
            return;
          }
        });
      });
      this.categoryService.updateCategory(res).subscribe();
  });
}

chooseCategory() {
  this.categoryService.chooseCategory(this.expenseModel.name).subscribe(res => {
    if (res == null) { this.expenseModel.category = this.categories[0]; }
    else { this.expenseModel.category = this.categories[res]; }
  });
}

}
