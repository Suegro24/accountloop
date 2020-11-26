import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss']
})
export class ChangePasswordModalComponent implements OnInit {

  changePasswordModel = {
    password: '',
    newPassword: ''
  };

  constructor(private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  changePassword() {
    this.userService.changePassword(this.data.userId, this.changePasswordModel.password, this.changePasswordModel.newPassword)
    .subscribe(res => {
      this.userService.playNotificationsSound();
      this.snackBar.open('Zmieniono hasło', 'OK', {
          horizontalPosition: 'right',
          duration: 5000,
          panelClass: ['snackbar-success']
        });
    },
    error => {
      if (error.error === 'Invalid password') {
        this.userService.playNotificationsSound();
        this.snackBar.open('Nieprawidłowe hasło', 'OK', {
          horizontalPosition: 'right',
          duration: 5000,
          panelClass: ['snackbar-warn']
        });
      }
    });
  }

}
