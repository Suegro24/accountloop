import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ShowNewPasswordModalComponent } from 'src/app/components/modals/show-new-password-modal/show-new-password-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users;

  constructor(private userService: UserService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(res => {
      this.users = res;

      this.users = this.users.filter(user => {
        if (!user.admin) return user;
      })
    })
  }

  restartPassword(user) {
    this.userService.restartPassword(user).subscribe(res => {
      this.userService.playNotificationsSound();
      this.snackBar.open('Udało się zmienić hasło', 'OK', {
        duration: 5000,
        horizontalPosition: 'right',
        panelClass: ['snackbar-success']
      })
      this.dialog.open(ShowNewPasswordModalComponent, {
        width: '300px',
        height: '200px',
        data: {
          password: res
        }
      });
    })
  }

  blockUser(user) {
    this.userService.blockUser(user).subscribe(res => {
      this.userService.playNotificationsSound();
      this.snackBar.open('Udało się zablokować użytkownika', 'OK', {
        duration: 5000,
        horizontalPosition: 'right',
        panelClass: ['snackbar-success']
      })
    })
  }

  unblockUser(user) {
    this.userService.unblockUser(user).subscribe(res => {
      this.userService.playNotificationsSound();
      this.snackBar.open('Udało się odblokować użytkownika', 'OK', {
        duration: 5000,
        horizontalPosition: 'right',
        panelClass: ['snackbar-success']
      })
    })
  }

}
