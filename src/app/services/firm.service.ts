import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';
import { Firm } from '../models/firm';
import { ChatMessageDto } from '../models/chatMessageDto';

@Injectable({
  providedIn: 'root'
})
export class FirmService {

  constructor(private conn: ConnectionService) { }

  getFirms() {
    return this.conn.http.get(this.conn.url + '/firms');
  }

  getFirm(id) {
    return this.conn.http.get<Firm>(this.conn.url + `/firms/${id}`);
  }

  getMessages(id: string) {
    return this.conn.http.get<ChatMessageDto[]>(this.conn.url + `/firms/messages/${id}`);
  }

  editFirm(id, firm) {
    return this.conn.http.put(this.conn.url + `/firms/${id}`, firm);
  }

  addFirm(firm, user) {
    return this.conn.http.post(this.conn.url + '/firms/createfirm', {
      firm,
      user
    });
  }

  acceptBudgetChange(firmId, id) {
    return this.conn.http.put(this.conn.url + `/firms/${firmId}/acceptBudgetChange/${id}`, null);
  }

  discardBudgetChange(firmId, id) {
    return this.conn.http.put(this.conn.url + `/firms/${firmId}/discardBudgetChange/${id}`, null);
  }

  deleteFirm(id) {
    return this.conn.http.put(this.conn.url + `/firms/delete/${id}`, null);
  }

}
