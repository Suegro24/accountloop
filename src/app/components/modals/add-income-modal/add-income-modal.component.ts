import { Component, OnInit, Inject } from '@angular/core';
import { Income } from 'src/app/models/income';
import { UserService } from 'src/app/services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Budget } from 'src/app/models/budget';
import { FirmService } from 'src/app/services/firm.service';

@Component({
  selector: 'app-add-income-modal',
  templateUrl: './add-income-modal.component.html',
  styleUrls: ['./add-income-modal.component.scss']
})
export class AddIncomeModalComponent implements OnInit {

  user: any = [];
  firm;
  incomeModel = new Income('', 0, null, '', 'income','','','');

  constructor(private userService: UserService, private firmService: FirmService, @Inject(MAT_DIALOG_DATA) public data: any) { }

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

  addIncome() {
    if (this.data.budgetType == 'user') {
      this.user.budget.income.push(this.incomeModel);
      this.userService.changeBudgetUser(this.user._id, this.user).subscribe();
    }
    else {
      if (this.user.firmStatus > 1) this.incomeModel.status = 'Accepted';
      else this.incomeModel.status = 'Waiting';
      this.firm.firmBudget.income.push(this.incomeModel);
      this.firmService.editFirm(this.firm._id, this.firm).subscribe();
    }

  }

}
