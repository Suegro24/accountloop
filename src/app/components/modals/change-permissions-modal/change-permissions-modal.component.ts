import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-change-permissions-modal',
  templateUrl: './change-permissions-modal.component.html',
  styleUrls: ['./change-permissions-modal.component.scss']
})
export class ChangePermissionsModalComponent implements OnInit {

  user;
  changePermissionsModel = new User('', '', '', '', '', '', '', null, '', null, null, '', 0, null, [], 0, null, null, null, [], null);
  permissions: number;

  constructor(private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit(): void {
    this.userService.getUser(this.data.userId).subscribe(res => {
      this.user = res;
    });

    this.userService.getUser(this.data.employeeId).subscribe(res => {
      this.changePermissionsModel = res;
      this.permissions = res.firmStatus;
    });
  }

  changePermissions() {
    this.userService.changeUserPermissions(this.data.employeeId, this.permissions).subscribe();
  }

}
