import { Component, OnInit, ViewChild } from '@angular/core';
import { OpenMailModalComponent } from 'src/app/components/modals/open-mail-modal/open-mail-modal.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MailService } from 'src/app/services/mail.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SendMailModalComponent } from 'src/app/components/modals/send-mail-modal/send-mail-modal.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-messages.component.scss']
})
export class AdminMessagesComponent implements OnInit {

  userId = localStorage.getItem('user');
  user;
  displayedColumns = ['topic', 'message', 'senderName'];
  dataSourceWaitingMails;
  dataSourceinProgressMails;
  dataSourceEndedMails;
  waitingMails: any = [];
  inProgressMails: any = [];
  endedMails: any = [];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private mailService: MailService, private dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
    this.getMails();
    this.userService.getUser(this.userId).subscribe(res => {
      this.user = res;
    });
  }

  getMails() {
    this.mailService.getAllMails().subscribe(res => {

      this.waitingMails = res || [];
      this.waitingMails = this.waitingMails.filter(mail => {
        if (mail.status === 'Oczekujące' && mail.type === 'userAsk') { return mail; }
      });

      this.inProgressMails = res;
      this.inProgressMails = this.inProgressMails.filter(mail => {
        if (mail.status === 'W trakcie' && mail.type === 'userAsk' && mail.recipientId === this.userId) { return mail; }
      });

      this.endedMails = res;
      this.endedMails = this.endedMails.filter(mail => {
        if (mail.status === 'Zakończone' && mail.type === 'userAsk') { return mail; }
      });

      this.dataSourceWaitingMails = new MatTableDataSource(this.waitingMails || []);
      this.dataSourceWaitingMails.sort = this.sort;
      this.dataSourceWaitingMails.paginator = this.paginator;

      this.dataSourceinProgressMails = new MatTableDataSource(this.inProgressMails || []);
      this.dataSourceinProgressMails.sort = this.sort;
      this.dataSourceinProgressMails.paginator = this.paginator;

      this.dataSourceEndedMails = new MatTableDataSource(this.endedMails || []);
      this.dataSourceEndedMails.sort = this.sort;
      this.dataSourceEndedMails.paginator = this.paginator;
    });
  }

  openMail(mail, canAnswer) {
    const ref = this.dialog.open(OpenMailModalComponent, {
      height: '500px',
      width: '400px',
      data: {
        mail,
        isAdmin: true,
        canAnswer
      }
    });
    ref.afterClosed().subscribe(res => {
      if (res === true) {
        if (mail.status !== 'W trakcie') {
          mail.status = 'W trakcie';
          mail.recipientId = this.userId;
          this.mailService.reserveMail(mail, this.userId).subscribe(() => {
            this.getMails();
          });
        }
        const reference = this.dialog.open(SendMailModalComponent, {
          width: '400px',
          height: '600px',
          data: {
            mail,
            adminName: this.user.name
          }
        });

        reference.afterClosed().subscribe(response => {
          if (response === true) {
            mail.status = 'Zakończone';
            this.mailService.respondeToMail(mail).subscribe(() => {
              this.getMails();
            });
          }
        });
      }
    });
  }
}
