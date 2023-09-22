import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { CustomError } from '../model/custom-error';
import { Router } from '@angular/router';

/** @see https://angular.io/api/core/ErrorHandler */
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    private _router: Router,
    private _ngZone: NgZone,
  ) {
  }

  /** @see https://angular.io/api/core/ErrorHandler#example */
  handleError(wrappedError: any) {

    this._ngZone.run(() => this._router.navigate(
      ['/error'], {
        skipLocationChange: true,
        queryParams: this._filterError(wrappedError.rejection ?? wrappedError)
      }
    ));
  }

  private _filterError(error: any): CustomError {

    // Navigator OffLIne
    if (!(navigator.onLine)) {
      return {
        title: 'OffLine',
        message: 'The navigator is OffLine'
      }
    }

    // Server Error
    if (error instanceof HttpErrorResponse) {
      return this._filterHTTPError(error);
    }

    // Client Error
    if (error instanceof Error) {
      return {
        title: 'Error',
        message: error.message ?? error.toString(),
        details: error.stack
      };
    }

    // Unknown error
    return {
      title: 'Unknown error',
      message: 'Oops! An Unknown Error Occurred',
      details: error.toString(),
    };
  }

  private _filterHTTPError(error: HttpErrorResponse): CustomError {

    // Invalid Country ID
    if (error.status === 400) {
      return {
        title: 'Server Error',
        message: `${error.statusText}`,
      }
    }

    // Other Server Error
    return {
      title: 'Server Error',
      message: `The Server returned a "${error.status} ${error.statusText}".`,
      details: error.message
    }
  }

}
