import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFirmComponent } from './manage-firm.component';

describe('ManageFirmComponent', () => {
  let component: ManageFirmComponent;
  let fixture: ComponentFixture<ManageFirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
