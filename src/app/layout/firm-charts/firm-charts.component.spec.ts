import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmChartsComponent } from './firm-charts.component';

describe('FirmChartsComponent', () => {
  let component: FirmChartsComponent;
  let fixture: ComponentFixture<FirmChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
