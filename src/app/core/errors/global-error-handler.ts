import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private _router: Router) { }

  handleError(wrapperError: any ) {

    const error = wrapperError.rejection ? wrapperError.rejection : wrapperError;
    let message: string;

    if (error instanceof HttpErrorResponse) {

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

    } else {
      // Client Error
      const clientMessage = error.message ? error.message : error.toString();
      message = `Client error :\n${clientMessage}`;
      alert(message);
    }
  }

}
