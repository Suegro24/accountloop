import { Component, OnInit } from '@angular/core';
import { Budget } from 'src/app/models/budget';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddIncomeModalComponent } from '../modals/add-income-modal/add-income-modal.component';
import { AddExpenseModalComponent } from '../modals/add-expense-modal/add-expense-modal.component';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss']
})
export class BudgetListComponent implements OnInit {

  user;
  accountChangesContainer: any;

  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.refreshList();
  }

  refreshList() {
    this.userService.getUser(this.user._id).subscribe(res => {
      this.user = res;
      if (!res.budget) this.user.budget = new Budget(null,[],[]);
      this.accountChangesContainer = [...res.budget.income,...res.budget.expense];
      this.accountChangesContainer = this.accountChangesContainer.sort((a,b) => Date.parse(b.date) - Date.parse(a.date) );
    })
  }

  addIncome() {
    const ref = this.dialog.open(AddIncomeModalComponent, {
      data: {
        id: this.user._id,
        budgetType: 'user'
      }
    });
    ref.afterClosed().subscribe(() => {
      this.refreshList();
    })
  } 

  addExpense() {
    const ref = this.dialog.open(AddExpenseModalComponent, {
      data: {
        id: this.user._id,
        budgetType: 'user'
      }
    });
    ref.afterClosed().subscribe(() => {
      this.refreshList();
    })
  }
}
