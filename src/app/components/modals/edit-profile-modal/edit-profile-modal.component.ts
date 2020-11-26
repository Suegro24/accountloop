import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss']
})
export class EditProfileModalComponent implements OnInit {

  profileModel = new User('', '', '', '', '', '', '', null, '', null, null, '', 0, null, [], 0, null, null, null, [], null);
  userId = localStorage.getItem('user');
  user;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('user');
    this.userService.getUser(this.userId).subscribe(res => {
      this.profileModel = res;
    });
  }

  editProfile() {
    this.userService.editUser(this.userId, this.profileModel).subscribe();
  }

}
