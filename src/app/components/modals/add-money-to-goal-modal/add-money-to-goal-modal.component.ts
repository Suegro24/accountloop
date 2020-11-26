import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-money-to-goal-modal',
  templateUrl: './add-money-to-goal-modal.component.html',
  styleUrls: ['./add-money-to-goal-modal.component.scss']
})
export class AddMoneyToGoalModalComponent implements OnInit {

  money: number;
  userId;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService,
              public dialogRef: MatDialogRef<AddMoneyToGoalModalComponent>) { }

  ngOnInit(): void {
  }

  addIncome() {
    this.userId = localStorage.getItem('user');
    this.userService.updateBudgetGoal(this.data.goal, this.userId, this.money).subscribe(_ => {
      this.dialogRef.close(true);
    });
  }

}
