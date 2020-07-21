import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { FirmSearchModalComponent } from 'src/app/components/modals/firm-search-modal/firm-search-modal.component';
import { FirmCreateModalComponent } from 'src/app/components/modals/firm-create-modal/firm-create-modal.component';
import { FirmService } from 'src/app/services/firm.service';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-firm',
  templateUrl: './firm.component.html',
  styleUrls: ['./firm.component.scss']
})
export class FirmComponent implements OnInit {

  chartType="firm";
  user;
  firm;

  constructor(private userService: UserService, private dialog: MatDialog, private firmService: FirmService, private chartService: ChartService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.refresh();
  }

  refresh() {
    this.userService.getUser(this.user._id).subscribe(res => {
      this.user = res;
      
      this.firmService.getFirm(this.user.firmId).subscribe(res => {
        this.firm = res;
      })
    })
  }

  searchFirm() {
    const ref = this.dialog.open(FirmSearchModalComponent);
    ref.afterClosed().subscribe(_ => {
      this.refresh();
    })
  }

  createFirm() {
    const ref = this.dialog.open(FirmCreateModalComponent);
    ref.afterClosed().subscribe(_ => {
      this.refresh();
    })
  }

}
