import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private conn: ConnectionService) { }

  getCurrentMonthChart(id: string) {
    return this.conn.http.get(this.conn.url + `/charts/currentMonthChart/${id}`);
  }

  getFirmCurrentMothChart(id: string) {
    return this.conn.http.get(this.conn.url + `/charts/currentMonthChart/firm/${id}`);
  }

  getCurrentMonthVerticalIncomeExpenseChart(id: string) {
    return this.conn.http.get(this.conn.url + `/charts/currentMonthVerticalIncomeExpenseChart/${id}`);
  }
}
