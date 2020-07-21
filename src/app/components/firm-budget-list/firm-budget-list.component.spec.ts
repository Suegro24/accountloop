import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmBudgetListComponent } from './firm-budget-list.component';

describe('FirmBudgetListComponent', () => {
  let component: FirmBudgetListComponent;
  let fixture: ComponentFixture<FirmBudgetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmBudgetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmBudgetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
