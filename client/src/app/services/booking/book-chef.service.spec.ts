import { TestBed } from '@angular/core/testing';

import { BookChefService } from './book-chef.service';

describe('BookChefService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookChefService = TestBed.get(BookChefService);
    expect(service).toBeTruthy();
  });
});
