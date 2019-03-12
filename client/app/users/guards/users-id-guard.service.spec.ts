import { TestBed } from '@angular/core/testing';

import { UsersIdGuardService } from './users-id-guard.service';

describe('UsersIdGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersIdGuardService = TestBed.get(UsersIdGuardService);
    expect(service).toBeTruthy();
  });
});
