import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FirmService } from 'src/app/services/firm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firm-users-list',
  templateUrl: './firm-users-list.component.html',
  styleUrls: ['./firm-users-list.component.scss']
})
export class FirmUsersListComponent implements OnInit {

  userId = localStorage.getItem('user');
  user;
  users;

  constructor(private userService: UserService, private firmService: FirmService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUser(this.userId).subscribe(res => {
      this.user = res;

      this.firmService.getFirm(this.user.firmId).subscribe(response => {
        this.users = response;
        this.users = this.users.users;

        this.users = this.users.sort((userOne, userTwo) => {
          if (userOne.firmStatus < userTwo.firmStatus) { return 1; }
          if (userOne.firmStatus > userTwo.firmStatus) { return -1; }
          return 0;
        });
      });
    });
  }

  goToProfile(id) {
    this.router.navigate(['/profil'], {queryParams: {id}});
  }


}
