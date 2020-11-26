import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  loginModel = {email: '', password: ''};

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser() {

   this.userService.loginUser(this.loginModel.email, this.loginModel.password).subscribe(
     res => {
     localStorage.setItem('token', res.token)
     localStorage.setItem('user', res.userId)
     this.router.navigate(['/admin-panel']);
   },
   error => {
     console.error(error);
   })
  }

}
