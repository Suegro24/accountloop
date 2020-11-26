import { Component, OnInit, OnChanges, SimpleChange, SimpleChanges, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-vertical-bar-chart-incomes-expenses',
  templateUrl: './vertical-bar-chart-incomes-expenses.component.html',
  styleUrls: ['./vertical-bar-chart-incomes-expenses.component.scss']
})
export class VerticalBarChartIncomesExpensesComponent implements OnChanges, OnInit {

  userId = localStorage.getItem('user');
  user;
  chartData: any;
  view: any[] = [500,300];
  @Input() chartDate: Date = new Date();
  @Input() chartType: string;
  monthName = this.chartService.getMonthName(this.chartDate.getMonth());

  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = false;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = false;
  yAxisLabel: string = 'Ilość pieniędzy';
  showYAxis: boolean = true;
  showXAxis: boolean = false;
  gradient: boolean = false;
  colorScheme = {
    domain: ['green', 'red']
  }

  constructor(private userService: UserService, private chartService: ChartService) { }

  ngOnInit(): void {
    this.userService.getUser(this.userId).subscribe(
      res => {
        this.user = res;
        if (this.chartType == 'user') {
          this.chartService.getCurrentMonthVerticalIncomeExpenseChart(this.user._id, this.chartDate.getMonth().toString()).subscribe(res => {
            this.chartData = res;
          })
        }
        else if (this.chartType == 'firm') {
          this.chartService.getFirmCurrentMonthVerticalIncomeExpenseChart(this.user.firmId, this.chartDate.getMonth().toString()).subscribe(res => {
            this.chartData = res;
          })
          
        }}),
      error => console.error(error)
  }

  getChart(month: string) {
    this.userService.getUser(this.userId).subscribe(res => {
      this.user = res;
      if (this.chartType == 'user') {
        this.chartService.getCurrentMonthVerticalIncomeExpenseChart(this.user._id, month).subscribe(res => {
          this.chartData = res;
        })
      }
      else if (this.chartType == 'firm') {
       
        this.chartService.getFirmCurrentMonthVerticalIncomeExpenseChart(this.user.firmId, month).subscribe(res => {
          this.chartData = res;
        })
      }
    },
    error => console.error(error))
  }

  ngOnChanges(changes: SimpleChanges) {
    this.monthName = this.chartService.getMonthName(this.chartDate.getMonth());
    this.getChart(this.chartDate.getMonth().toString());
  }

}
