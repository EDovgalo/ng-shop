import { TestBed } from '@angular/core/testing';

import { LoadProductsGuard } from './load-products.guard';

describe('LoadProductsGuard', () => {
  let guard: LoadProductsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoadProductsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
