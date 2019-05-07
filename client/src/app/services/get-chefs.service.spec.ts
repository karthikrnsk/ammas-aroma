import { TestBed } from '@angular/core/testing';

import { GetChefsService } from './get-chefs.service';

describe('GetChefsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetChefsService = TestBed.get(GetChefsService);
    expect(service).toBeTruthy();
  });
});
