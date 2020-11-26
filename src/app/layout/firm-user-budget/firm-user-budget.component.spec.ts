import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmUserBudgetComponent } from './firm-user-budget.component';

describe('FirmUserBudgetComponent', () => {
  let component: FirmUserBudgetComponent;
  let fixture: ComponentFixture<FirmUserBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmUserBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmUserBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
