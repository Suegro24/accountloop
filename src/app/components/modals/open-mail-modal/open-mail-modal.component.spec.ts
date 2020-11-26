import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenMailModalComponent } from './open-mail-modal.component';

describe('OpenMailModalComponent', () => {
  let component: OpenMailModalComponent;
  let fixture: ComponentFixture<OpenMailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenMailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenMailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
