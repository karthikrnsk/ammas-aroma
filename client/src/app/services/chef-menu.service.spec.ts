import { TestBed } from '@angular/core/testing';

import { ChefMenuService } from './chef-menu.service';

describe('ChefMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChefMenuService = TestBed.get(ChefMenuService);
    expect(service).toBeTruthy();
  });
});
