import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAccountChangeDetailsComponent } from './show-account-change-details.component';

describe('ShowAccountChangeDetailsComponent', () => {
  let component: ShowAccountChangeDetailsComponent;
  let fixture: ComponentFixture<ShowAccountChangeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAccountChangeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAccountChangeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
