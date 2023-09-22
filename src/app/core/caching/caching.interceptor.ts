import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { filter, Observable, shareReplay, take } from 'rxjs';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  private readonly _store: Record<string, Observable<HttpEvent<any>>> = {};

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this._isCacheable(request)) {
      return next.handle(request)
    }

    // Check if observable is in cache, otherwise call next.handle

    const cachedObservable: Observable<HttpEvent<any>> = this._store[request.urlWithParams] ||
      (this._store[request.urlWithParams] = next.handle(request).pipe(
        // Filter since we are interested in caching the response only, not progress events
        filter((res) => res instanceof HttpResponse),
        // Share replay will cache the response
        shareReplay(1)
      ));

    // Mimic the behaviour of httpClient.get
    return cachedObservable.pipe(take(1));
  }

  private _isCacheable(req: HttpRequest<any>): boolean {
    return (req.method == "GET");
  }

}
