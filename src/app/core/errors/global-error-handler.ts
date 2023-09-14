import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  handleError(wrapperError: any ) {

    const error = wrapperError.rejection ? wrapperError.rejection : wrapperError;
    let message: string = '';

    if (error instanceof HttpErrorResponse) {
      // Server Error
      message = `Server error :\n${error.message}`;
    } else {
      // Client Error
      const clientMessage = error.message ? error.message : error.toString();
      message = `Client error :\n${clientMessage}`;
    }
    alert(message);
  }

}
