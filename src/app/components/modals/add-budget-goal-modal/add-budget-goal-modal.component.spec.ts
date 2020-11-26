import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBudgetGoalModalComponent } from './add-budget-goal-modal.component';

describe('AddBudgetGoalModalComponent', () => {
  let component: AddBudgetGoalModalComponent;
  let fixture: ComponentFixture<AddBudgetGoalModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBudgetGoalModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBudgetGoalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
