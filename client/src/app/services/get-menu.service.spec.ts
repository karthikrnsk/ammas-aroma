import { TestBed } from '@angular/core/testing';

import { GetMenuService } from './get-menu.service';

describe('GetMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetMenuService = TestBed.get(GetMenuService);
    expect(service).toBeTruthy();
  });
});
