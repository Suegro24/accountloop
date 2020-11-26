import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoneyToGoalModalComponent } from './add-money-to-goal-modal.component';

describe('AddMoneyToGoalModalComponent', () => {
  let component: AddMoneyToGoalModalComponent;
  let fixture: ComponentFixture<AddMoneyToGoalModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMoneyToGoalModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMoneyToGoalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
