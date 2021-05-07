import { TestBed } from '@angular/core/testing';

import { LoginGuards } from './login.guard';

describe('LoginGuard', () => {
  let guard: LoginGuards;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginGuards);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
