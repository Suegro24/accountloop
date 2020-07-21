import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddIncomeModalComponent } from '../modals/add-income-modal/add-income-modal.component';
import { FirmService } from 'src/app/services/firm.service';
import { UserService } from 'src/app/services/user.service';
import { AddExpenseModalComponent } from '../modals/add-expense-modal/add-expense-modal.component';

@Component({
  selector: 'app-firm-budget-list',
  templateUrl: './firm-budget-list.component.html',
  styleUrls: ['./firm-budget-list.component.scss']
})
export class FirmBudgetListComponent implements OnInit {

  user;
  firm;
  accountChangesContainer;
  acceptedBudgetChanges = 0;

  constructor(private dialog: MatDialog, private firmService: FirmService, private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.refresh();
  }

  refresh() {
    this.userService.getUser(this.user._id).subscribe(res => {
      this.user = res;

      this.firmService.getFirm(this.user.firmId).subscribe(res => {
        this.firm = res;
        this.accountChangesContainer = [...this.firm.firmBudget.income,...this.firm.firmBudget.expense];
        this.accountChangesContainer = this.accountChangesContainer.sort((a,b) => Date.parse(b.date) - Date.parse(a.date));
        this.accountChangesContainer.forEach(change => {
          if (change.status == 'Accepted') this.acceptedBudgetChanges++;
        });
      })
    })
  }

  addIncome() {
    const ref = this.dialog.open(AddIncomeModalComponent, {
      data: {
        id: this.user._id,
        firmId: this.firm._id,
        budgetType: 'firm'
      }
    });
    ref.afterClosed().subscribe(() => {
      this.refresh();
    })
  } 

  addExpense() {
    const ref = this.dialog.open(AddExpenseModalComponent, {
      data: {
        id: this.user._id,
        firmId: this.firm._id,
        budgetType: 'firm'
      }
    });
    ref.afterClosed().subscribe(() => {
      this.refresh();
    })
  }

}
