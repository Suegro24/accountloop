import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetForecastingChartComponent } from './budget-forecasting-chart.component';

describe('BudgetForecastingChartComponent', () => {
  let component: BudgetForecastingChartComponent;
  let fixture: ComponentFixture<BudgetForecastingChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetForecastingChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetForecastingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
