import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileModalComponent } from 'src/app/components/modals/edit-profile-modal/edit-profile-modal.component';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('user'));
  profileImage: ImageSnippet;

  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.userService.getUser(this.user._id).subscribe(res => {
      this.user = res;
    })
  }

  addUserPhoto(profilePhoto: any) {
    const file: File = profilePhoto.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.profileImage = new ImageSnippet(event.target.result, file);
      this.user.photo = this.profileImage;

      this.userService.editUser(this.user._id, this.user).subscribe(
        () => {
          this.userService.getUser(this.user._id).subscribe(res => {
            this.user = res;
          })
        },
        (err) => {
          console.error(err);
        }
      )

    })
    
  }

  editProfile() {
    const ref = this.dialog.open(EditProfileModalComponent);
    ref.afterClosed().subscribe(() => {
      this.refresh();
    })
  }

}
