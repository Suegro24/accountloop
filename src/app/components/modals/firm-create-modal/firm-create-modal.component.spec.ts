import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmCreateModalComponent } from './firm-create-modal.component';

describe('FirmCreateModalComponent', () => {
  let component: FirmCreateModalComponent;
  let fixture: ComponentFixture<FirmCreateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmCreateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
