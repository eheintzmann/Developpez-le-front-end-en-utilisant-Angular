import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorComponent } from './component/error.component';
import { GlobalErrorHandler } from './handler/global-error-handler';
import { ErrorRoutingModule } from './error-routing.module';

@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    CommonModule,
    ErrorRoutingModule
  ],
  providers: [
    GlobalErrorHandler,
    /** @see https://angular.io/api/core/ErrorHandler#example */
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
})
export class ErrorModule { }
