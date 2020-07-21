import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmLeavingFirmComponent } from './confirm-leaving-firm.component';

describe('ConfirmLeavingFirmComponent', () => {
  let component: ConfirmLeavingFirmComponent;
  let fixture: ComponentFixture<ConfirmLeavingFirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmLeavingFirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmLeavingFirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
