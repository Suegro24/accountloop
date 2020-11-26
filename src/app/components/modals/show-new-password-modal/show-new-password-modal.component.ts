import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-show-new-password-modal',
  templateUrl: './show-new-password-modal.component.html',
  styleUrls: ['./show-new-password-modal.component.scss']
})
export class ShowNewPasswordModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar, private userService: UserService) { }

  ngOnInit(): void {
  }

  copyToClipboard() {

    this.userService.playNotificationsSound();
    this.snackBar.open('Skopiowano hasło do schowka', 'OK', {
      duration: 5000,
      horizontalPosition: 'right',
      panelClass: ['snackbar-success']
    })
  }

}
