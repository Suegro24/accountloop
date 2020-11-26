import { Component, OnInit } from '@angular/core';
import { FirmService } from 'src/app/services/firm.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-firm-search-modal',
  templateUrl: './firm-search-modal.component.html',
  styleUrls: ['./firm-search-modal.component.scss']
})
export class FirmSearchModalComponent implements OnInit {

  user;
  userId = localStorage.getItem('user');
  firms: any;
  searchedFirm = '';
  activeFirms = 0;
  ready;

  constructor(private firmService: FirmService, private userService: UserService) { }

  ngOnInit(): void {
    this.ready = false;
    this.firmService.getFirms().subscribe(res => {
      this.firms = res;
      this.firms = this.firms.filter(firm => {
        if (firm.isDeleted !== true) {
          this.activeFirms++;
          return firm;
        }
      });
      this.ready = true;
      console.log(this.firms);
    });

    this.userService.getUser(this.userId).subscribe(res => {
      this.user = res;
    });
  }

  joinFirm(id) {
    this.userService.joinFirm(id, this.user).subscribe();
  }

}
