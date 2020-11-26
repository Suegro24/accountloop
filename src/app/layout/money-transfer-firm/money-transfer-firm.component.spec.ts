import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyTransferFirmComponent } from './money-transfer-firm.component';

describe('MoneyTransferFirmComponent', () => {
  let component: MoneyTransferFirmComponent;
  let fixture: ComponentFixture<MoneyTransferFirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyTransferFirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyTransferFirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
