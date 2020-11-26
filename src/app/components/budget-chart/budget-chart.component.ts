import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-budget-chart',
  templateUrl: './budget-chart.component.html',
  styleUrls: ['./budget-chart.component.scss']
})
export class BudgetChartComponent implements OnChanges, OnInit {

  constructor(private userService: UserService, private chartService: ChartService) { }

  userId = localStorage.getItem('user');
  user
  chartContainer: any;
  @Input() chartType: string;
  @Input() chartDate: Date = new Date();
  monthName = this.chartService.getMonthName(this.chartDate.getMonth());

  view = ['400','300']
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dzień';
  yAxisLabel: string = 'Ilość pieniędzy';

  ngOnInit(): void {
    this.userService.getUser(this.userId).subscribe(
      res => {
        this.user = res;
        if (this.chartType == 'user') {
          this.chartService.getCurrentMonthChart(this.user._id, this.chartDate.getMonth().toString()).subscribe(res => {
            this.chartContainer = res;
          })
        }
        else if (this.chartType == 'firm') {
          this.chartService.getFirmCurrentMothChart(this.user.firmId, this.chartDate.getMonth().toString()).subscribe(res => {
            this.chartContainer = res;
          })
        }
      },
      error => console.error(error)
    )}

  getChart(month) {
    this.userService.getUser(this.userId).subscribe(res => {
      this.user = res;
      if (this.chartType == 'user') {
        this.chartService.getCurrentMonthChart(this.user._id, month).subscribe(res => {
          this.chartContainer = res;
        })
      }
      else if (this.chartType == 'firm') {
        this.chartService.getFirmCurrentMothChart(this.user.firmId, month).subscribe(res => {
          this.chartContainer = res;
        })
      }
    },
    error => console.error(error))

  }

  ngOnChanges(changes: SimpleChanges) {
    this.monthName = this.chartService.getMonthName(this.chartDate.getMonth());
    this.getChart(this.chartDate.getMonth());
  }

}
