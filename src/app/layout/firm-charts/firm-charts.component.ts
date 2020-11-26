import { Component, OnInit } from '@angular/core';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-firm-charts',
  templateUrl: './firm-charts.component.html',
  styleUrls: ['./firm-charts.component.scss']
})
export class FirmChartsComponent implements OnInit {

  chartType = "firm";
  chartDate = [new Date(), new Date()];

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
  }

  previousMonth(chart: number) {
    this.chartDate[chart] = new Date(this.chartDate[chart].setMonth(this.chartDate[chart].getMonth()-1));
  }

  nextMonth(chart: number) {
    this.chartDate[chart] = new Date(this.chartDate[chart].setMonth(this.chartDate[chart].getMonth()+1));
  }

}
