import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountryDetailComponent } from './pages/country-detail/country-detail.component';
import { homeResolver } from "./pages/home/home.resolver";
import { countryDetailResolver } from "./pages/country-detail/country-detail.resolver";
import { ServerErrorComponent } from "./pages/server-error/server-error.component";
import { serverErrorResolver } from "./pages/server-error/server-error.resolver";
import { ErrorComponent } from './pages/error/error.component';
import { errorResolver } from './pages/error/error.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: HomeComponent,
    resolve: { homeData: homeResolver }
  },
  {
    path: 'detail/:id',
    component: CountryDetailComponent,
    resolve: { countryDetailData: countryDetailResolver }
  },
  {
    path: 'error',
    component: ErrorComponent,
    resolve: { clientError: errorResolver }
  },
  {
    path: 'server-error',
    component: ServerErrorComponent,
    resolve: { serverError: serverErrorResolver }
  },
  {
    path: '**', // wildcard
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
