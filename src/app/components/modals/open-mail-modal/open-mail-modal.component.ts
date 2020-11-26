import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-open-mail-modal',
  templateUrl: './open-mail-modal.component.html',
  styleUrls: ['./open-mail-modal.component.scss']
})
export class OpenMailModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
