import { Component, OnInit, Inject } from '@angular/core';
import { Mail } from 'src/app/models/mail';
import { MailService } from 'src/app/services/mail.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-send-mail-modal',
  templateUrl: './send-mail-modal.component.html',
  styleUrls: ['./send-mail-modal.component.scss']
})
export class SendMailModalComponent implements OnInit {

  mailModel = new Mail('','','','','','','');

  constructor(private mailService: MailService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
      this.mailModel.recipientId = this.data.mail.senderId;
      this.mailModel.topic = this.data.mail.topic;
      this.mailModel.senderName = this.data.adminName;
  }

  sendMessage() {
    this.mailModel.recipientId = this.data.mail.senderId;
    this.mailModel.status = "Zakończone";
    this.mailModel.type = "adminResponse";
    this.mailService.sendMessage(this.mailModel).subscribe();
  }

}
