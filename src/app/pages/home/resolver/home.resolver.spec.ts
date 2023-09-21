import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { homeResolver } from './home.resolver';
import { HomeData } from '../model/home-data';

describe('homeResolver', () => {
  const executeResolver: ResolveFn<HomeData> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => homeResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
