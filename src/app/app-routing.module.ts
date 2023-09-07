import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountryComponent } from './pages/country/country.component';

const routes: Routes = [
  {
    path: 'countries',
    component: HomeComponent,
  },
  {
    path: 'countries/:id',
    component: CountryComponent,
  },
  {
    path: '',
    redirectTo: '/countries',
    pathMatch: 'full',
  },
  {
    path: '**', // wildcard
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
