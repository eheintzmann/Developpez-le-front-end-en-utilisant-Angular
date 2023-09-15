import { ResolveFn, Router } from '@angular/router';
import { inject } from "@angular/core";

export const errorResolver: ResolveFn<boolean> = (route, state) => {
  const router: Router = inject(Router);

  return router.getCurrentNavigation()?.extras?.state?.['clientError'];
};
