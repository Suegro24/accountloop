import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerModel = new User('','','','','','','',null,'',null,{'name': '', 'earnings': 0},'',0,[],0);

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  addUser() {
    this.userService.addUser(this.registerModel).subscribe(res => {
      alert('Rejestracja pomyślna');
      this.router.navigate(['/logowanie']);
    })
  }

}
