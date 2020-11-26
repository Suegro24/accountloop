import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-unblock-user-modal',
  templateUrl: './unblock-user-modal.component.html',
  styleUrls: ['./unblock-user-modal.component.scss']
})
export class UnblockUserModalComponent implements OnInit {

  blockedUsersId = [];
  blockedUsers = [];
  user;

  constructor(private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.userService.getUser(this.data.userId).subscribe(res => {
      this.blockedUsersId = res.disabledUser;
      this.user = res;

      this.blockedUsersId.map(id => {
        this.userService.getUser(id).subscribe(res => {
          this.blockedUsers.push(res);
        })
      })
    })
  }

  remove(user) {
    this.user.disabledUser = this.user.disabledUser.filter(u => {
      if (u != user._id) return u;
    })

    this.userService.editUser(this.user._id, this.user).subscribe(() => {
      this.refreshList();
    });
  }

}
