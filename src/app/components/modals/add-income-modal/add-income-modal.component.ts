import { Component, OnInit, Inject } from '@angular/core';
import { Income } from 'src/app/models/income';
import { UserService } from 'src/app/services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Budget } from 'src/app/models/budget';
import { FirmService } from 'src/app/services/firm.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-income-modal',
  templateUrl: './add-income-modal.component.html',
  styleUrls: ['./add-income-modal.component.scss']
})
export class AddIncomeModalComponent implements OnInit {

  user: any = [];
  firm;
  incomeModel = new Income('', 0, null, {name: '', icon: '', matches: []}, 'income', 'Accepted', '', '', '', '');
  categories: any = [];
  defaultCategory: any;
  budgetGoals;
  selectedBudgetGoal;

  constructor(private userService: UserService, private firmService: FirmService,
              @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddIncomeModalComponent>,
              private categoryService: CategoryService) { }

  ngOnInit(): void {
      this.userService.getUser(this.data.id).subscribe(res => {
        this.user = res;
        this.budgetGoals = res.budgetGoals;
        this.budgetGoals = this.budgetGoals.filter(goal => {
          if (!goal.isCompleted) { return goal; }
        });
        if (!this.user.budget) { this.user.budget = new Budget(null, [], []); }
      });
      if (this.data.budgetType === 'firm') {
      this.firmService.getFirm(this.data.firmId).subscribe(res => {
        this.firm = res;
      });
    }

      this.categoryService.getAllCategories().subscribe(res => {
      this.categories = res;
      this.incomeModel.category = res[0];
    });
  }

  manageCategory() {
    this.categoryService.getCategory(this.incomeModel.category.name).subscribe(res => {
      const words = this.incomeModel.name.toLowerCase().split(' ');
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

  addIncome() {
    if (this.data.budgetType === 'user') {
      this.user.budget.income.push(this.incomeModel);
      this.userService.changeBudgetUser(this.user._id, this.user).subscribe();
      if (this.selectedBudgetGoal !== undefined) {
        this.userService.updateBudgetGoal(this.selectedBudgetGoal, this.data.id, this.incomeModel.money).subscribe();
      }

      this.dialogRef.close(true);
    }
    else {
      if (this.user.firmStatus > 1) { this.incomeModel.status = 'Accepted'; }
      else { this.incomeModel.status = 'Waiting'; }
      this.firm.firmBudget.income.push(this.incomeModel);
      this.firmService.editFirm(this.firm._id, this.firm).subscribe();
    }
    this.manageCategory();
  }

  chooseCategory() {
    this.categoryService.chooseCategory(this.incomeModel.name).subscribe(res => {
      if (res == null) { this.incomeModel.category = this.categories[0]; }
      else { this.incomeModel.category = this.categories[res]; }
    });
  }

}
