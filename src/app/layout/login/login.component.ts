import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginModel = {email: '', password: ''};

  constructor(private userService: UserService, private router: Router, private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated) this.router.navigate(['/przeglad'])
  }

  loginUser() {

   this.userService.loginUser(this.loginModel.email, this.loginModel.password).subscribe(
     res => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', res.userId);
      this.userService.changeOnlineStatus(res.userId).subscribe();
      this.router.navigate(['/przeglad']);
   },
   error => {
      if (error.error == 'Invalid email' || error.error == 'Invalid password') {
        this.userService.playNotificationsSound();
        this.snackBar.open('Nieprawidłowy adres email lub hasło', 'OK', {
          horizontalPosition: 'right',
          duration: 5000,
          panelClass: ['snackbar-warn']
        })
      }
      else if (error.error == 'User is blocked') {
        this.userService.playNotificationsSound();
        this.snackBar.open('Twoje konto zostało zbanowane', 'OK', {
          horizontalPosition: 'right',
          duration: 5000,
          panelClass: ['snackbar-warn']
        })
      }
      else if (error) {
        this.userService.playNotificationsSound();
        this.snackBar.open('Coś poszło nie tak, spróbuj ponownie później', 'OK', {
          horizontalPosition: 'right',
          duration: 5000,
          panelClass: ['snackbar-warn']
        })
      }
   })
  }
 }
