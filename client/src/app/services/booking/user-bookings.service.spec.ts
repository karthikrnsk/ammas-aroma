import { TestBed } from '@angular/core/testing';

import { UserBookingsService } from './user-bookings.service';

describe('UserBookingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserBookingsService = TestBed.get(UserBookingsService);
    expect(service).toBeTruthy();
  });
});
