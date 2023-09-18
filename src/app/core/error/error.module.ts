import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalErrorHandler } from "./handler/global-error-handler";

import { ErrorRoutingModule } from "./error-routing.module";
import { ErrorComponent } from "./component/error.component";

@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    CommonModule,
    ErrorRoutingModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ]
})
export class ErrorModule { }
