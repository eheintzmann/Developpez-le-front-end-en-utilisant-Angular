import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private _router: Router) { }

  handleError(wrapperError: any ) {
    const error = wrapperError.rejection ? wrapperError.rejection : wrapperError;

    if (error instanceof HttpErrorResponse) {
      // Server Error
      this._router.navigateByUrl('/server-error', {
        state: {
          serverError: {
            name: error.name,
            message: error.message,
            status: error.status,
            statusText: error.statusText,
            url: error.url
          }
        }
      });

    } else if (error instanceof Error) {
      // Client Error
      this._router.navigateByUrl('/error', {
        state: {
          clientError: {
            name: error.name,
            message: error.message,
            stack: error.stack
          }
        }
      });
    } else {
      // Unknown Error
      this._router.navigateByUrl('/error', {
        state: {
          clientError: {
            message: error.toString()
          }
        }
      });
    }
  }

}
