import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefBookingsViewComponent } from './chef-bookings-view.component';

describe('ChefBookingsViewComponent', () => {
  let component: ChefBookingsViewComponent;
  let fixture: ComponentFixture<ChefBookingsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChefBookingsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefBookingsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
