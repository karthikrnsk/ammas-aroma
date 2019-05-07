import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookingsViewComponent } from './user-bookings-view.component';

describe('UserBookingsViewComponent', () => {
  let component: UserBookingsViewComponent;
  let fixture: ComponentFixture<UserBookingsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBookingsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBookingsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
