import { Component, OnInit } from '@angular/core';
import { Firm } from 'src/app/models/firm';
import { FirmService } from 'src/app/services/firm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-firm-create-modal',
  templateUrl: './firm-create-modal.component.html',
  styleUrls: ['./firm-create-modal.component.scss']
})
export class FirmCreateModalComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('user'));
  firmCreateModel = new Firm('', {'country': '', 'city': '', 'street': ''}, [], null, false);

  constructor(private firmService: FirmService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser(this.user._id).subscribe(res => {
      this.user = res;
    })
  }

  createFirm() {
    this.firmService.addFirm(this.firmCreateModel, this.user).subscribe();
  }

}
