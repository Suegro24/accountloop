import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-budget-forecasting-chart',
  templateUrl: './budget-forecasting-chart.component.html',
  styleUrls: ['./budget-forecasting-chart.component.scss']
})
export class BudgetForecastingChartComponent implements OnInit {

  userId = localStorage.getItem('user');
  user
  chartContainer: any;
  @Input() chartType: string;
  @Input() chartDate: Date = new Date();
  monthName = this.chartService.getMonthName(this.chartDate.getMonth());

  view = ['500','300']
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dzień';
  yAxisLabel: string = 'Ilość pieniędzy';

  multi = [
    {
      "name": "Germany",
      "series": [
        {
          "name": "1990",
          "value": 62000000
        },
        {
          "name": "2010",
          "value": 73000000
        },
        {
          "name": "2011",
          "value": 89400000
        }
      ]
    },
  
    {
      "name": "USA",
      "series": [
        {
          "name": "1990",
          "value": 250000000
        },
        {
          "name": "2010",
          "value": 309000000
        },
        {
          "name": "2011",
          "value": 311000000
        }
      ]
    },
  
    {
      "name": "France",
      "series": [
        {
          "name": "1990",
          "value": 58000000
        },
        {
          "name": "2010",
          "value": 50000020
        },
        {
          "name": "2011",
          "value": 58000000
        }
      ]
    },
    {
      "name": "UK",
      "series": [
        {
          "name": "1990",
          "value": 57000000
        },
        {
          "name": "2010",
          "value": 62000000
        }
      ]
    }
  ];
  

  constructor(private userService: UserService, private chartService: ChartService) { }

  ngOnInit(): void {
    this.userService.getUser(this.userId).subscribe(
      res => {
        this.user = res;
        if (this.chartType == 'user') {
          this.chartService.getForecastingChart(this.user._id).subscribe(res => {
            this.chartContainer = res;
          })
        }
        else if (this.chartType == 'firm') {
          this.chartService.getFirmForecastingChart(this.user.firmId).subscribe(res => {
            this.chartContainer = res;
          })
        }
      },
      error => console.error(error)
    )}

}
