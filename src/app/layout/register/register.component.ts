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
  users;

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  addUser() {

    console.log(this.checkIfEmailExist(this.registerModel.email));
    if (this.checkIfEmailExist(this.registerModel.email))  {
      return;
    }

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

  checkIfEmailExist(email): boolean {
    for (const user of this.users) {
      if (user.email === email) {
        this.snackBar.open('Podany adres email już istnieje', 'OK', {
          horizontalPosition: 'right',
          duration: 5000,
          panelClass: ['snackbar-warn']
        });
        return true;
      }
    }
    return false;
  }

}
