import { TestBed } from '@angular/core/testing';

import { IngresoGuard } from './ingreso.guard';

describe('IngresoGuard', () => {
  let guard: IngresoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IngresoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
