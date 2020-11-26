import { Component, OnInit, ViewChild } from '@angular/core';
import { Mail } from '../../models/mail';
import { UserService } from 'src/app/services/user.service';
import { MailService } from 'src/app/services/mail.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { OpenMailModalComponent } from '../../components/modals/open-mail-modal/open-mail-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-helpdesk',
  templateUrl: './helpdesk.component.html',
  styleUrls: ['./helpdesk.component.scss']
})
export class HelpdeskComponent implements OnInit {

  userId = localStorage.getItem('user');
  user;
  mailModel = new Mail('', '', '', '', '', '', '');

  sendedMails: any = [];
  displayedColumnsSendedMails = ['topic', 'message', 'status'];
  dataSourceSendedMails;

  receivedMails: any = [];
  displayedColumnsReceivedMails = ['topic', 'message', 'senderName'];
  dataSourceReceivedMails;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService, private mailService: MailService, private snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getUser(this.userId).subscribe(res => {
      this.user = res;
    });
    this.getSendedMessages();
    this.getReceivedMessages();
}

  getSendedMessages() {
    this.mailService.getSendedMails(this.userId).subscribe(res => {
      this.sendedMails = res || [];
      this.dataSourceSendedMails = new MatTableDataSource(this.sendedMails || []);
      this.dataSourceSendedMails.sort = this.sort;
      this.dataSourceSendedMails.paginator = this.paginator;
    });
  }

  getReceivedMessages() {
    this.mailService.getReceivedMails(this.userId).subscribe(res => {
      this.receivedMails = res || [];
      this.receivedMails = this.receivedMails.filter(mail => {
        if (mail.type === 'adminResponse') { return mail; }
      });
      this.dataSourceReceivedMails = new MatTableDataSource(this.receivedMails || []);
      this.dataSourceReceivedMails.sort = this.sort;
      this.dataSourceReceivedMails.paginator = this.paginator;
    });
  }

  sendMessage() {
    const username = this.user.name + ' ' + this.user.surname;
    this.mailModel.senderName = username;
    this.mailModel.senderId = this.userId;
    this.mailModel.type = 'userAsk';
    this.mailService.sendMessage(this.mailModel).subscribe(
      res => {
        this.userService.playNotificationsSound();
        this.snackBar.open('Wiadomość została wysłana', 'OK', {
          duration: 5000,
          horizontalPosition: 'right',
          panelClass: ['snackbar-success']
        });
        this.mailModel.topic = '';
        this.mailModel.message = '';
        this.getSendedMessages();
    });
  }

  openMail(mail) {
    const ref = this.dialog.open(OpenMailModalComponent, {
      height: '500px',
      width: '600px',
      data: {
        mail,
        isAdmin: false
      }
    });
    ref.afterClosed().subscribe(() => {
      this.getSendedMessages();
    });
  }

}
