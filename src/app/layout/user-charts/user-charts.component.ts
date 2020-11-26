import { Component, OnInit} from '@angular/core';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-user-charts',
  templateUrl: './user-charts.component.html',
  styleUrls: ['./user-charts.component.scss']
})
export class UserChartsComponent implements OnInit {

  chartType = "user";
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
