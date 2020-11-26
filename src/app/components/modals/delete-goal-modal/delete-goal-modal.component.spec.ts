import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGoalModalComponent } from './delete-goal-modal.component';

describe('DeleteGoalModalComponent', () => {
  let component: DeleteGoalModalComponent;
  let fixture: ComponentFixture<DeleteGoalModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteGoalModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteGoalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
