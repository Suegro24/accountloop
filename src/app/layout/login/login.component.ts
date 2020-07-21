import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  users: any = [];
  loginModel = {email: '', password: ''};

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser() {

    this.userService.getUsers().subscribe(res => {
      this.users = res;

      this.users.map(user => {
        if (user.email == this.loginModel.email && user.password == this.loginModel.password) {
          localStorage.setItem('user', JSON.stringify(user));
          this.userService.isUserLoggedIn = true;
          this.router.navigate(['/przeglad']);

        }
      })
    })
     
  }

 }
