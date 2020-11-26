import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Budget } from 'src/app/models/budget';
import { MatDialog } from '@angular/material/dialog';
import { AddBudgetGoalModalComponent } from 'src/app/components/modals/add-budget-goal-modal/add-budget-goal-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { FormControl } from '@angular/forms';
import { ShowAccountChangeDetailsComponent } from 'src/app/components/modals/show-account-change-details/show-account-change-details.component';
import { AddMoneyToGoalModalComponent } from 'src/app/components/modals/add-money-to-goal-modal/add-money-to-goal-modal.component';
import { EditGoalModalComponent } from 'src/app/components/modals/edit-goal-modal/edit-goal-modal.component';
import { DeleteGoalModalComponent } from 'src/app/components/modals/delete-goal-modal/delete-goal-modal.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user;
  userId;
  accountChangesContainer: any;
  categories;
  category;
  selectedCategories = new FormControl();
  name;
  checkboxes = {
    incomes: true,
    expenses: true
  };
  currentDate;
  currentMonth;
  budgetGoals;
  completedGoals;


  constructor(private userService: UserService, private dialog: MatDialog, private snackBar: MatSnackBar,
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('user');
    this.currentDate = new Date();
    this.currentMonth = this.currentDate.getMonth();
    this.refreshList(this.currentMonth);
    this.categoryService.getAllCategories().subscribe(res => {
      this.categories = res;
    });
  }

  refreshList(month) {
    this.userService.getUser(this.userId).subscribe(res => {
      this.user = res;
      if (!res.budget) { this.user.budget = new Budget(null, [], []); }
      this.accountChangesContainer = [...res.budget.income, ...res.budget.expense];
      this.accountChangesContainer = this.accountChangesContainer.filter(change => {
        return (new Date(change.date).getMonth() === month);
      });
      this.accountChangesContainer = this.accountChangesContainer.sort((a, b) => Date.parse(b.date) - Date.parse(a.date) );
    });

    this.refreshGoals();
  }

  previousMonth() {
    this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() - 1));
    this.currentMonth--;
    this.refreshList(this.currentMonth);
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() + 1));
    this.currentMonth++;
    this.refreshList(this.currentMonth);
  }

  addBudgetGoal() {
    const dialogRef = this.dialog.open(AddBudgetGoalModalComponent, {
      width: '400px',
      height: '300px',
      data: {
        userId: this.userId
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res === true) {
        this.userService.playNotificationsSound();
        this.snackBar.open('Pomyślnie dodano kategorie', 'OK', {
          duration: 5000,
          horizontalPosition: 'right',
          panelClass: ['snackbar-success']
        });
        this.refreshList(new Date().getMonth());
    }
    });
  }

  showDetails(data) {
    this.dialog.open(ShowAccountChangeDetailsComponent, {
      data: {
        data
      },
      width: '500px'
    });
  }

  refreshGoals() {
    this.userService.getUserBudgetGoals(this.userId).subscribe(res => {
      this.budgetGoals = res;
      this.completedGoals = this.budgetGoals.filter(goal => {
        if (goal.isCompleted) {
          return goal;
        }
      });
    });
  }

  addMoney(goal) {
    const ref = this.dialog.open(AddMoneyToGoalModalComponent, {
      data: {
        goal
      }
    });

    ref.afterClosed().subscribe(res => {
      if (res === true) {
        this.userService.playNotificationsSound();
        this.snackBar.open('Pomyślnie dodano kategorie', 'OK', {
          duration: 5000,
          horizontalPosition: 'right',
          panelClass: ['snackbar-success']
        });
        this.refreshGoals();
      }
    });
  }

  editGoal(goal) {
    const ref = this.dialog.open(EditGoalModalComponent, {
      data: {
        goal
      }
    });

    ref.afterClosed().subscribe(res => {
      if (res === true) {
        this.userService.playNotificationsSound();
        this.snackBar.open('Pomyślnie uaktualniono cel', 'OK', {
          duration: 5000,
          horizontalPosition: 'right',
          panelClass: ['snackbar-success']
        });
        this.refreshGoals();
      }
    });
  }

  deleteGoal(goal) {
    const ref = this.dialog.open(DeleteGoalModalComponent, {
      data: {
        goal
      }
    });

    ref.afterClosed().subscribe(res => {
      if (res === true) {
        this.userService.deleteGoal(this.userId, goal).subscribe(_ => {
          this.userService.playNotificationsSound();
          this.snackBar.open('Pomyślnie usunięto cel', 'OK', {
            duration: 5000,
            horizontalPosition: 'right',
            panelClass: ['snackbar-success']
          });
          this.refreshGoals();
        });
      }
    });
  }
}
