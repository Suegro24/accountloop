import { Component, OnInit } from '@angular/core';
import { Settings } from '../../models/settings';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordModalComponent } from 'src/app/components/modals/change-password-modal/change-password-modal.component';
import { UnblockUserModalComponent } from 'src/app/components/modals/unblock-user-modal/unblock-user-modal.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  userId = localStorage.getItem('user');
  settingsModel = new Settings(null, null, null, null, null);

  constructor(private userService: UserService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getUser(this.userId).subscribe(res => {
      this.settingsModel = res.settings;
    });
  }

  saveSettings() {
    this.userService.saveSettings(this.userId, this.settingsModel).subscribe(res => {
      this.userService.playNotificationsSound();
      this.snackBar.open('Ustawienia zapisano poprawnie', 'OK', {
        duration: 5000,
        horizontalPosition: 'right',
        panelClass: ['snackbar-success']
      });
    });
  }

  changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordModalComponent, {
      width: '300px',
      height: '300px',
      data: {
        userId: this.userId
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res === true) {
        this.userService.playNotificationsSound();
        this.snackBar.open('Pomyślnie zmieniono hasło', 'OK', {
          duration: 5000,
          horizontalPosition: 'right',
          panelClass: ['snackbar-success']
        });
      }
    });
  }

  unblockUser() {
    const dialogRef = this.dialog.open(UnblockUserModalComponent, {
      width: '400px',
      height: '500px',
      data: {
        userId: this.userId
      }
    });
  }

}
