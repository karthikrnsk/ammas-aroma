import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishBookingInputComponent } from './finish-booking-input.component';

describe('FinishBookingInputComponent', () => {
  let component: FinishBookingInputComponent;
  let fixture: ComponentFixture<FinishBookingInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishBookingInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishBookingInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
