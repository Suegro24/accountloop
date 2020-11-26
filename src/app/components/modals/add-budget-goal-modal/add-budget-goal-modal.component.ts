import { Component, OnInit, Inject } from '@angular/core';
import { BudgetGoals } from 'src/app/models/budgetGoals';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-budget-goal-modal',
  templateUrl: './add-budget-goal-modal.component.html',
  styleUrls: ['./add-budget-goal-modal.component.scss']
})
export class AddBudgetGoalModalComponent implements OnInit {

  budgetGoalModel = new BudgetGoals('', null, 0, false, null);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService) { }

  ngOnInit(): void {
  }

  addBudgetGoal() {
    this.userService.addBudgetGoal(this.budgetGoalModel, this.data.userId).subscribe();
  }

}
