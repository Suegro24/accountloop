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
  firms: any;
  searchedFirm = '';
  activeFirms: number;

  constructor(private firmService: FirmService, private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.firmService.getFirms().subscribe(res => {
      this.firms = res;
      this.firms.forEach(firm => {
        if (firm.isDeleted != true) this.activeFirms++;
      });
    })

    this.userService.getUser(this.user._id).subscribe(res => {
      this.user = res;
    })
  }

  joinFirm(id) {
    this.userService.joinFirm(id, this.user).subscribe();
  }

}
