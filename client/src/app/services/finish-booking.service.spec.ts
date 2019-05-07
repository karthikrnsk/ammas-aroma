import { TestBed } from '@angular/core/testing';

import { FinishBookingService } from './finish-booking.service';

describe('FinishBookingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FinishBookingService = TestBed.get(FinishBookingService);
    expect(service).toBeTruthy();
  });
});
