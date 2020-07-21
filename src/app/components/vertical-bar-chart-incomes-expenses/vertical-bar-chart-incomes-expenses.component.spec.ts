import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalBarChartIncomesExpensesComponent } from './vertical-bar-chart-incomes-expenses.component';

describe('VerticalBarChartIncomesExpensesComponent', () => {
  let component: VerticalBarChartIncomesExpensesComponent;
  let fixture: ComponentFixture<VerticalBarChartIncomesExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalBarChartIncomesExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalBarChartIncomesExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
