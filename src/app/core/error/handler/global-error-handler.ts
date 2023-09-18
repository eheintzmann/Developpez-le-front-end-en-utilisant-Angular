import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorClass } from '../enum/error-class';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private _router: Router) { }

  handleError(wrapperError: any) {
    const error = wrapperError.rejection ? wrapperError.rejection : wrapperError;

    if (error instanceof HttpErrorResponse) {
      // Server Error
      this._router.navigate(['error'], {
        skipLocationChange: true,
        queryParams: {
          class: ErrorClass.Server,
          name: error.name,
          message: error.message,
          status: error.status,
          statusText: error.statusText,
          url: error.url
        }
      });
      return;
    }
    // Client Error
    if (error instanceof Error) {
      this._router.navigate(['error'], {
        skipLocationChange: true,
        queryParams: {
          class: ErrorClass.Client,
          name: error.name,
          message: error.message,
          stack: error.stack
        }
      });
      return;
    }
    // Unknown Error
    this._router.navigate(['error'], {
      skipLocationChange: true,
      queryParams: {
        class: ErrorClass.Unknown,
        message: error.toString()
      }
    });
  }

}
