import { Component, Input, OnInit } from '@angular/core';
import { Budget } from 'src/app/models/budget';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddIncomeModalComponent } from '../modals/add-income-modal/add-income-modal.component';
import { AddExpenseModalComponent } from '../modals/add-expense-modal/add-expense-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShowAccountChangeDetailsComponent } from '../modals/show-account-change-details/show-account-change-details.component';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss']
})
export class BudgetListComponent implements OnInit {

  user;
  userId = localStorage.getItem('user');
  accountChangesContainer: any;
  userTotalMoney;
  @Input() type: string;

  constructor(private userService: UserService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.userService.getUser(this.userId).subscribe(res => {
      this.user = res;
      if (this.type === 'firm') {
        if (!res.firmBudget) { this.user.firmBudget = new Budget(null, [], []); }
        this.accountChangesContainer = [...res.firmBudget.income, ...res.firmBudget.expense];
        this.accountChangesContainer = this.accountChangesContainer.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
        this.userTotalMoney = res.firmBudget.money;
        console.log(res);
      } else {
        if (!res.budget) { this.user.budget = new Budget(null, [], []); }
        this.accountChangesContainer = [...res.budget.income, ...res.budget.expense];
        this.accountChangesContainer = this.accountChangesContainer.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
        this.userTotalMoney = res.budget.money;
        this.accountChangesContainer = this.accountChangesContainer.filter(change => {
          if (change.status !== 'Waiting' || change.type === 'expense') { return change; }
        });
      }
    });
  }

  addIncome() {
    const ref = this.dialog.open(AddIncomeModalComponent, {
      data: {
        id: this.user._id,
        budgetType: 'user'
      }
    });
    ref.afterClosed().subscribe(res => {
      if (res === true) {
        this.userService.playNotificationsSound();
        this.snackBar.open('Poprawnie dodano przychód', 'OK', {
          duration: 5000,
          horizontalPosition: 'right',
          panelClass: ['snackbar-success']
        });
      }
      this.refreshList();
    });
  }

  addExpense() {
    const ref = this.dialog.open(AddExpenseModalComponent, {
      disableClose: true,
      data: {
        id: this.user._id,
        budgetType: 'user'
      }
    });
    ref.afterClosed().subscribe((res) => {
      if (res === 0) {
        this.userService.playNotificationsSound();
        this.snackBar.open('Poprawnie dodano wydatek', 'OK', {
          duration: 5000,
          horizontalPosition: 'right',
          panelClass: ['snackbar-success']
        });
      }
      else if (res === 2) {
        this.userService.playNotificationsSound();
        this.snackBar.open('Operacja nie powiodła się ponieważ ujemny stan budżetu jest niedozwolony', 'OK', {
          duration: 5000,
          horizontalPosition: 'right',
          panelClass: ['snackbar-warn']
        });
      }
      this.refreshList();
    });
  }

  showDetails(data) {
    this.dialog.open(ShowAccountChangeDetailsComponent, {
      data: {
        data
      }
    });
  }
}
