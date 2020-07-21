import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmUsersListComponent } from './firm-users-list.component';

describe('FirmUsersListComponent', () => {
  let component: FirmUsersListComponent;
  let fixture: ComponentFixture<FirmUsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmUsersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
