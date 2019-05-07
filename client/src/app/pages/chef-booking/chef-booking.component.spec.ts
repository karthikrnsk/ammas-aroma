import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefBookingComponent } from './chef-booking.component';

describe('ChefBookingComponent', () => {
  let component: ChefBookingComponent;
  let fixture: ComponentFixture<ChefBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChefBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
