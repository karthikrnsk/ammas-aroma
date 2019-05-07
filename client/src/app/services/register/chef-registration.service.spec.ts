import { TestBed } from '@angular/core/testing';

import { ChefRegistrationService } from './chef-registration.service';

describe('ChefRegistrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChefRegistrationService = TestBed.get(ChefRegistrationService);
    expect(service).toBeTruthy();
  });
});
