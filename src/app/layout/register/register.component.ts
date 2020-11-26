import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerModel = new User('', '', '', '', '', '', '', null, '', null, {name: '', earnings: 0}, '', 0, null, [], 0, null, null,
  null, [], null);

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  addUser() {
    this.userService.addUser(this.registerModel).subscribe(
      res => {
        this.userService.playNotificationsSound();
        this.snackBar.open('Poprawnie zarejestrowano użytkownika', 'OK', {
          horizontalPosition: 'right',
          duration: 5000,
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/logowanie']);
    },
    error => {
      this.userService.playNotificationsSound();
      this.snackBar.open('Coś poszło nie tak, spróbuj ponownie później', 'OK', {
        horizontalPosition: 'right',
        duration: 5000,
        panelClass: ['snackbar-warn']
      });
    });
  }

}
