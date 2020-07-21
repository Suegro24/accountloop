import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-budget-chart',
  templateUrl: './budget-chart.component.html',
  styleUrls: ['./budget-chart.component.scss']
})
export class BudgetChartComponent implements OnInit {

  constructor(private userService: UserService, private chartService: ChartService) { }

  user;
  chartContainer: any;
  @Input() chartType: string;

  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dzień';
  yAxisLabel: string = 'Ilość pieniędzy';

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userService.getUser(this.user._id).subscribe(res => {
      this.user = res;
      
      if (this.chartType == 'user') {
        this.chartService.getCurrentMonthChart(this.user._id).subscribe(res => {
          this.chartContainer = res;
        })
      }
      else if (this.chartType == 'firm') {
        this.chartService.getFirmCurrentMothChart(this.user.firmId).subscribe(res => {
          this.chartContainer = res;
        })
      }

    })
  }

}
