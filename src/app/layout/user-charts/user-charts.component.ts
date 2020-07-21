import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-charts',
  templateUrl: './user-charts.component.html',
  styleUrls: ['./user-charts.component.scss']
})
export class UserChartsComponent implements OnInit {

  chartType = "user";
  constructor() { }

  ngOnInit(): void {
  }

}
