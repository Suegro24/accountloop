import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileModalComponent } from 'src/app/components/modals/edit-profile-modal/edit-profile-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChangePasswordModalComponent } from 'src/app/components/modals/change-password-modal/change-password-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnblockUserModalComponent } from 'src/app/components/modals/unblock-user-modal/unblock-user-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userId = localStorage.getItem('user');
  user;
  image;
  loggedInUser = true;
  searchedUserId;

  constructor(private userService: UserService, public dialog: MatDialog, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.loggedInUser = false;
        this.searchedUserId = params.id;
      }
    });
    if (this.loggedInUser) {
      this.userService.getUser(this.userId).subscribe(res => {
        this.user = res;
      });
    }
    else {
      this.userService.getUser(this.searchedUserId).subscribe(res => {
        this.user = res;
      });
    }
  }

  editProfile() {
    const ref = this.dialog.open(EditProfileModalComponent);
    ref.afterClosed().subscribe(() => {
      this.refresh();
    });
  }

  updateUserImage() {
    console.log(this.image);
  }
}
