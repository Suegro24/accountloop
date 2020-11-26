import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FirmService } from 'src/app/services/firm.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Income } from 'src/app/models/income';
import { Expense } from 'src/app/models/expense';

@Component({
  selector: 'app-money-transfer-firm',
  templateUrl: './money-transfer-firm.component.html',
  styleUrls: ['./money-transfer-firm.component.scss']
})
export class MoneyTransferFirmComponent implements OnInit {

  userId = localStorage.getItem('user');
  user;
  firm;
  paymentModel = new Income('', null, null, {name: 'Przelew', icon: '', matches: []}, '', 'Waiting', '', '', '', '');
  paymentToFirmModel = new Income('', null, null, {name: 'Przelew', icon: '', matches: []}, '', 'Waiting', '', '', '', '');
  paymentFromFirmToUserModel = new Income('', null, null, {name: 'Przelew', icon: '', matches: []}, '', 'Waiting', '', '', '', '');
  selectedUser;

  constructor(private userService: UserService, private firmService: FirmService, public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.getUser(this.userId).subscribe(res => {
      this.user = res;

      this.firmService.getFirm(this.user.firmId).subscribe(response => {
        this.firm = response;
      });
    });
  }

  sendPaymentToUser() {
    if (!this.checkUserBudget(this.paymentModel)) { return; }

    const expense = new Expense('', 0, null, {name: 'Przelew', icon: '', matches: []}, 'expense', '', '');
    expense.name = this.paymentModel.name;
    expense.money = this.paymentModel.money;
    expense.date = new Date();
    expense.type = 'expense';
    expense.status = 'Accepted';
    this.user.firmBudget.expense.push(expense);

    this.paymentModel.type = 'income';
    this.paymentModel.status = 'Accepted';
    this.paymentModel.date = new Date();

    this.user.budget.income.push(this.paymentModel);
    this.userService.editUser(this.userId, this.user).subscribe(res => {
      this.userService.playNotificationsSound();
      this.snackBar.open('Udało się wysłać pieniądze', 'OK', {
        panelClass: ['snackbar-success'],
        duration: 5000,
        horizontalPosition: 'right'
      });
    });
  }

  sendPaymentToFirm() {
    if (!this.checkUserBudget(this.paymentToFirmModel)) { return; }

    const expense = new Expense('', 0, null, {name: 'Przelew', icon: '', matches: []}, 'expense', '', '');
    expense.name = this.paymentToFirmModel.name;
    expense.money = this.paymentToFirmModel.money;
    expense.date = new Date();
    expense.type = 'expense';
    expense.status = 'Waiting';
    this.user.firmBudget.expense.push(expense);

    this.paymentToFirmModel.type = 'income';
    if (this.user.firmStatus > 1) {
      this.paymentToFirmModel.status = 'Accepted';
    }
    else {
      this.paymentToFirmModel.status = 'Waiting';
    }
    this.paymentToFirmModel.date = new Date();
    this.paymentToFirmModel.senderName = this.user.name + ' ' + this.user.surname;
    this.paymentToFirmModel.senderId = this.user._id;

    this.firmService.getFirm(this.user.firmId).subscribe(res => {
      this.firm = res;
      this.firm.firmBudget.income.push(this.paymentToFirmModel);

      this.firmService.editFirm(this.firm._id, this.firm).subscribe( () => {
        this.userService.playNotificationsSound();
        this.snackBar.open('Udało się wysłać pieniądze', 'OK', {
          panelClass: ['snackbar-success'],
          duration: 5000,
          horizontalPosition: 'right'
        });
      });
    });
  }

  sendPaymentFromFirmToUser() {
    if (!this.checkFirmBudget(this.paymentFromFirmToUserModel)) { return; }

    let totalExpense = 0;

    this.paymentFromFirmToUserModel.type = 'income';
    this.paymentFromFirmToUserModel.status = 'Accepted';
    this.paymentFromFirmToUserModel.date = new Date();
    this.paymentFromFirmToUserModel.senderName = this.firm.name;

    this.selectedUser.forEach(user => {
      user.firmBudget.income.push(this.paymentFromFirmToUserModel);
      this.userService.editUser(user._id, user).subscribe();
      totalExpense += this.paymentFromFirmToUserModel.money;
    });

    const expense = new Expense('', 0, null, {name: 'Przelew', icon: '', matches: []}, 'expense', '', '');
    expense.name = this.paymentFromFirmToUserModel.name;
    expense.money = totalExpense;
    expense.date = new Date();
    expense.type = 'expense';
    expense.status = 'Accepted';
    console.log(expense);
    this.firm.firmBudget.expense.push(expense);

    this.firmService.editFirm(this.firm._id, this.firm).subscribe(_ => {
      this.userService.playNotificationsSound();
      this.snackBar.open('Udało się wysłać pieniądze', 'OK', {
        panelClass: ['snackbar-success'],
        duration: 5000,
        horizontalPosition: 'right'
      });
    });
  }

  checkUserBudget(payment) {
    if (this.user.firmBudget.money - payment.money < 0) {
      this.userService.playNotificationsSound();
      this.snackBar.open('Zbyt mało środków na koncie', 'OK', {
        panelClass: ['snackbar-warn'],
        duration: 5000,
        horizontalPosition: 'right'
      });
      return false;
    }
    return true;
  }

  checkFirmBudget(payment) {
    if (this.firm.firmBudget.money - payment.money < 0) {
      this.userService.playNotificationsSound();
      this.snackBar.open('Zbyt mało środków na koncie', 'OK', {
        panelClass: ['snackbar-warn'],
        duration: 5000,
        horizontalPosition: 'right'
      });
      return false;
    }
    return true;
  }
}
