import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmSearchModalComponent } from './firm-search-modal.component';

describe('FirmSearchModalComponent', () => {
  let component: FirmSearchModalComponent;
  let fixture: ComponentFixture<FirmSearchModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmSearchModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmSearchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
