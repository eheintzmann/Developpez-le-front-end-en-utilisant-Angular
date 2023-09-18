import { ParamMap, ResolveFn } from '@angular/router';

export const errorResolver: ResolveFn<ParamMap> = (route, state) => {

  return route.queryParamMap;
};
