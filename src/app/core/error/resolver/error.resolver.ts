import { ParamMap, ResolveFn } from '@angular/router';
import { CustomError } from '../model/custom-error';

export const errorResolver: ResolveFn<CustomError> = (route) => {
  const queryParams: ParamMap = route.queryParamMap;

  // CustomError
  return {
    title: queryParams.get('title') ?? 'No corresponding page found',
    message: queryParams.get('message') ?? undefined,
    details: queryParams.get('details') ?? undefined
  }
}
