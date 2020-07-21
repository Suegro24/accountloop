import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-vertical-bar-chart-incomes-expenses',
  templateUrl: './vertical-bar-chart-incomes-expenses.component.html',
  styleUrls: ['./vertical-bar-chart-incomes-expenses.component.scss']
})
export class VerticalBarChartIncomesExpensesComponent implements OnInit {

  user;
  chartData: any;
  view: any[] = [500,300];

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
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userService.getUser(this.user._id).subscribe(res => {
      this.user = res;
      
     
      this.chartService.getCurrentMonthVerticalIncomeExpenseChart(this.user._id).subscribe(res => {
        this.chartData = res;
        console.log(res);
      })

    })
  }

}
