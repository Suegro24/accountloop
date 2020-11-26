import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BudgetGoals } from 'src/app/models/budgetGoals';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-goal-modal',
  templateUrl: './edit-goal-modal.component.html',
  styleUrls: ['./edit-goal-modal.component.scss']
})
export class EditGoalModalComponent implements OnInit {

  goalModel = new BudgetGoals('', null, null, null, null);
  userId;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService,
              public dialogRef: MatDialogRef<EditGoalModalComponent>) { }

  ngOnInit(): void {
    this.goalModel = this.data.goal;
  }

  editGoal() {
    this.userId = localStorage.getItem('user');
    this.userService.editGoal(this.userId, this.goalModel).subscribe(_ => {
      this.dialogRef.close(true);
    });
  }

}
