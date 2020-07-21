import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Budget } from 'src/app/models/budget';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user;
  accountChangesContainer: any;
  category;
  name;
  checkboxes = {
    'incomes': true,
    'expenses': true
  }
  currentDate;
  currentMonth;
  

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.currentDate = new Date();
    this.currentMonth = this.currentDate.getMonth();
    this.refreshList(this.currentMonth);
  }

  refreshList(month) {
    this.userService.getUser(this.user._id).subscribe(res => {
      this.user = res;
      if (!res.budget) this.user.budget = new Budget(null,[],[]);
      this.accountChangesContainer = [...res.budget.income,...res.budget.expense];
      this.accountChangesContainer = this.accountChangesContainer.filter(change => {
        return (new Date(change.date).getMonth() == month);
      })
      this.accountChangesContainer = this.accountChangesContainer.sort((a,b) => Date.parse(b.date) - Date.parse(a.date) );
    })
  }

  previousMonth() {
    this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth()-1));
    this.currentMonth--;
    this.refreshList(this.currentMonth);
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth()+1));
    this.currentMonth++;
    this.refreshList(this.currentMonth);
  }

  changeList(value) {
    // let copyOfArray = Object.assign([], this.accountChangesContainer);
    // if (value == 'category') {
    //   this.accountChangesContainer = copyOfArray.filter(change => {
    //     return change.typeName.includes(this.category);
    //   })
    // }
  }

}
