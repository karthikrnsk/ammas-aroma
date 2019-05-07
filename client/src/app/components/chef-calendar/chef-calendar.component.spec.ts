import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefCalendarComponent } from './chef-calendar.component';

describe('ChefCalendarComponent', () => {
  let component: ChefCalendarComponent;
  let fixture: ComponentFixture<ChefCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChefCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
