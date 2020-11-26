import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  public monthNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

  constructor(private conn: ConnectionService) { }

  getMonthName(monthValue: number) {
    return this.monthNames[monthValue];
  }

  getCurrentMonthChart(id: string, month: string) {
    let data = {month: month};
    return this.conn.http.get(this.conn.url + `/charts/currentMonthChart/${id}`, {
      params: data
    });
  }

  getFirmCurrentMothChart(id: string, month: string) {
    let data = {month: month};
    return this.conn.http.get(this.conn.url + `/charts/currentMonthChart/firm/${id}`, {
      params: data
    });
  }

  getCurrentMonthVerticalIncomeExpenseChart(id: string, month: string) {
    let data = {month:month};
    return this.conn.http.get(this.conn.url + `/charts/currentMonthVerticalIncomeExpenseChart/${id}`, {
      params: data
    });
  }

  getFirmCurrentMonthVerticalIncomeExpenseChart(id: string, month: string) {
    let data = {month:month};
    return this.conn.http.get(this.conn.url + `/charts/currentMonthVerticalIncomeExpenseChart/firm/${id}`, {
      params: data
    });
  }

  getForecastingChart(id: string) {
    return this.conn.http.get(this.conn.url + `/charts/forecasting-chart/${id}`);
  }

  getFirmForecastingChart(id: string) {
    return this.conn.http.get(this.conn.url + `/charts/forecasting-chart/firm/${id}`);
  }

  
}
