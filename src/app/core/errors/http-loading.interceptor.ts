import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoadingService } from '../services/loading.service';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {

  constructor(private _loading: LoadingService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loading.setLoading(true, request.url);
    return next.handle(request)
      .pipe(
        // delay(2500),
        catchError((error: any) => {
          this._loading.setLoading(false, request.url);
          let errorMessage: string = '';
          if (error.error instanceof ErrorEvent) {
            // client error
            errorMessage = `Error: ${error.message}`;
          } else {
            // server error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          return throwError(() => new Error(errorMessage));
        }),
        map((evt: HttpEvent<any>): HttpEvent<any> => {
            if (evt instanceof HttpResponse) {
              this._loading.setLoading(false, request.url);
            }
            return evt;
          }
        )
      );
  }
}
