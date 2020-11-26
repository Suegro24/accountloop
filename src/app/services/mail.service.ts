import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import { Mail } from '../models/mail';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private conn: ConnectionService) { }

  sendMessage(mail: Mail) {
    return this.conn.http.put(this.conn.url + '/mail/send-message', mail);
  }

  getSendedMails(id: string) {
    return this.conn.http.get(this.conn.url + `/mail/user-send-messages/${id}`);
  }

  getReceivedMails(id: string) {
    return this.conn.http.get(this.conn.url + `/mail/user-received-messages/${id}`);
  }

  getMail(id) {
    return this.conn.http.get<Mail>(this.conn.url + `/mail/${id}`);
  }

  getAllMails() {
    return this.conn.http.get(this.conn.url + '/mail/mails');
  }

  reserveMail(mail, id) {
    return this.conn.http.put(this.conn.url + `/mail/reserve-mail/${id}`, mail);
  }

  respondeToMail(mail) {
    return this.conn.http.put(this.conn.url + `/mail/responde-mail`, mail); 
  }
}
