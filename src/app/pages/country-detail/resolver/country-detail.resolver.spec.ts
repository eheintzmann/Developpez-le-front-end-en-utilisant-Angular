import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { countryDetailResolver } from './country-detail.resolver';
import { CountryDetailData } from '../model/country-detail-data';


describe('countryDetailResolver', () => {
  const executeResolver: ResolveFn<CountryDetailData> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => countryDetailResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
