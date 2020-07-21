import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FirmService } from 'src/app/services/firm.service';

@Component({
  selector: 'app-firm-users-list',
  templateUrl: './firm-users-list.component.html',
  styleUrls: ['./firm-users-list.component.scss']
})
export class FirmUsersListComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('user'));
  users;

  constructor(private userService: UserService, private firmService: FirmService) { }

  ngOnInit(): void {
    this.userService.getUser(this.user._id).subscribe(res => {
      this.user = res;

      this.firmService.getFirm(this.user.firmId).subscribe(res => {
        this.users = res;
        this.users = this.users.users;
      })
    })
  }


}
