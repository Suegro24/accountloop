import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFirmDataModalComponent } from './edit-firm-data-modal.component';

describe('EditFirmDataModalComponent', () => {
  let component: EditFirmDataModalComponent;
  let fixture: ComponentFixture<EditFirmDataModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFirmDataModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFirmDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
