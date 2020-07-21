import { Component, OnInit } from '@angular/core';
import { FirmService } from 'src/app/services/firm.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangePermissionsModalComponent } from 'src/app/components/modals/change-permissions-modal/change-permissions-modal.component';
import { Router } from '@angular/router';
import { EditFirmDataModalComponent } from 'src/app/components/modals/edit-firm-data-modal/edit-firm-data-modal.component';
import { ConfirmLeavingFirmComponent } from 'src/app/components/modals/confirm-leaving-firm/confirm-leaving-firm.component';

@Component({
  selector: 'app-manage-firm',
  templateUrl: './manage-firm.component.html',
  styleUrls: ['./manage-firm.component.scss']
})
export class ManageFirmComponent implements OnInit {

  user;
  firm;
  accountChangesContainer;

  constructor(private firmService: FirmService, private userService: UserService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.refresh();
  }

  refresh() {
    this.userService.getUser(this.user._id).subscribe(res => {
      this.user = res;

      this.firmService.getFirm(this.user.firmId).subscribe(res => {
        this.firm = res;
        this.accountChangesContainer = [...this.firm.firmBudget.income,...this.firm.firmBudget.expense];
      })
    })
  }

  acceptUser(id) {
    this.userService.acceptUserToFirm(id).subscribe(() => {
      this.refresh();
    });
  }
  
  discardUser(id) {
    this.userService.discardUserToFirm(id).subscribe(() => {
      this.refresh();
    });
  }

  acceptBudgetChange(id) {
    this.firmService.acceptBudgetChange(this.firm._id, id).subscribe(() => {
      console.log('asd');
      this.refresh();
    });
  }

  discardBudgetChange(id) {
    this.firmService.discardBudgetChange(this.firm._id, id).subscribe(() => {
      this.refresh();
    });
  }

  changePermissions(id) {
    const ref = this.dialog.open(ChangePermissionsModalComponent, {
      data: {
        userId: this.user._id,
        employeeId: id
      }
    });
    ref.afterClosed().subscribe(() => {
      this.refresh();
    })
  }

  deleteEmployee(id) {
    this.userService.deleteUserFromFirm(id).subscribe(() => {
      this.refresh();
    });
  }

  deleteFirm() {
    this.firmService.deleteFirm(this.firm._id).subscribe();
    this.router.navigate(['/firma']);
  }

  leaveFirm() {
    let amountOfOwners = 0;
    this.firm.users.forEach(user => {
      if (user.firmStatus == 3) amountOfOwners++;
    });
    if (amountOfOwners == 1 && this.user.firmStatus == 3) {
      const ref = this.dialog.open(ConfirmLeavingFirmComponent)
      ref.afterClosed().subscribe(res => {
        if (res == true) {
          this.firmService.deleteFirm(this.firm._id).subscribe();
          this.router.navigate(['/firma']);
        }
      })
    }
    else {
      this.userService.leaveFirm(this.user._id).subscribe();
      this.router.navigate(['/firma']);
    }
   
    
  }

  editFirmData() {
    const ref = this.dialog.open(EditFirmDataModalComponent, {
      data: {
        id: this.firm._id
      }
    });
    ref.afterClosed().subscribe( () => {
      this.refresh();
    })
  }

}
