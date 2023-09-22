import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/component/home.component';
import { CountryDetailComponent } from './pages/country-detail/component/country-detail.component';
import { homeResolver } from './pages/home/resolver/home.resolver';
import { countryDetailResolver } from './pages/country-detail/resolver/country-detail.resolver';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
