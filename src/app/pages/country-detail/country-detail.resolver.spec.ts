import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { countryDetailResolver } from './country-detail.resolver';

describe('countryDetailResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => countryDetailResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
