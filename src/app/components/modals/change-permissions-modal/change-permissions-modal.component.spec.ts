import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePermissionsModalComponent } from './change-permissions-modal.component';

describe('ChangePermissionsModalComponent', () => {
  let component: ChangePermissionsModalComponent;
  let fixture: ComponentFixture<ChangePermissionsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePermissionsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePermissionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
