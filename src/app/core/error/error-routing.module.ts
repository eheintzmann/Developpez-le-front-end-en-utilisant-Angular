import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './component/error.component';
import { errorResolver } from './resolver/error.resolver';

const routes: Routes = [
  {
    path: '**',
    component: ErrorComponent,
    resolve: { customError : errorResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
