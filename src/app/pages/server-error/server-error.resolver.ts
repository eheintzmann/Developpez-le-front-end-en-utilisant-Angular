import { ResolveFn, Router } from '@angular/router';
import { inject } from "@angular/core";

export const serverErrorResolver: ResolveFn<{ [key: string]: string | number | null }> = (route, state) => {
  const router: Router = inject(Router);

  return router.getCurrentNavigation()?.extras?.state?.['serverError'];
};
