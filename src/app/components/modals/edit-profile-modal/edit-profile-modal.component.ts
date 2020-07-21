import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss']
})
export class EditProfileModalComponent implements OnInit {

  profileModel = new User('','','','','','','',null,'',null,null,'',0,[],0);
  user;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userService.getUser(this.user._id).subscribe(res => {
      this.profileModel = res;
    })
  }

  editProfile() {
    this.userService.editUser(this.user._id, this.profileModel).subscribe();
  }

}
