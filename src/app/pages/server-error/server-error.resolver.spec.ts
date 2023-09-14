import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { serverErrorResolver } from './server-error.resolver';

describe('serverErrorResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => serverErrorResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
