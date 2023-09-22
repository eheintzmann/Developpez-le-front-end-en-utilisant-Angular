import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { errorResolver } from './error.resolver';
import { CustomError } from '../model/custom-error';

describe('errorResolver', () => {
  const executeResolver: ResolveFn<CustomError> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => errorResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
