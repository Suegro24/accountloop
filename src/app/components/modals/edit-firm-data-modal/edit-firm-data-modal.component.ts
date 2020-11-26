import { Component, OnInit, Inject } from '@angular/core';
import { Firm } from 'src/app/models/firm';
import { FirmService } from 'src/app/services/firm.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-firm-data-modal',
  templateUrl: './edit-firm-data-modal.component.html',
  styleUrls: ['./edit-firm-data-modal.component.scss']
})
export class EditFirmDataModalComponent implements OnInit {

  firmModel = new Firm('', {'country': '', 'city': '', 'street': ''}, [], null, false, []);

  constructor(private firmService: FirmService, @Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit(): void {
    this.firmService.getFirm(this.data.id).subscribe(res => {
      this.firmModel = res;
    })
  }

  editFirmData() {
    this.firmService.editFirm(this.data.id, this.firmModel).subscribe();
  }

}
