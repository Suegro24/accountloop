import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User;
  userId;
  isUserLoggedIn: boolean;
  @Input() isAdminLoggedIn: boolean = false;
  @Input() pageName: string;

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem('user')) {
      this.isUserLoggedIn = false;
    } 
    else {
      this.isUserLoggedIn = true;
      this.userId = localStorage.getItem('user');
      this.userService.getUser(this.userId).subscribe(
        res => {
          this.user = res;
        },
        error => console.error(error),
      )
    } 
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userService.changeOnlineStatus(this.userId).subscribe();
    this.router.navigate(['/logowanie']);
  }

}
