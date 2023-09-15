import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { errorResolver } from './error.resolver';

describe('errorResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => errorResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
