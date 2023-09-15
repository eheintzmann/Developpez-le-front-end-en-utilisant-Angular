import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  private _cache: Map<string, HttpResponse<any>> = new Map();

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isCacheable(request)) {
      return next.handle(request)
    }

    const cachedResponse: HttpResponse<any> | undefined = this._cache.get(request.url);
    return cachedResponse ? of(cachedResponse) : this.sendRequest(request, next);
  }

  private isCacheable(req: HttpRequest<any>): boolean {
    return (req.method == "GET");
  }

  /**
   * Get server response observable by sending request to `next()`.
   * Will add the response to the cache on the way out.
   */
  private sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        // There may be other events besides the response.
        if (event instanceof HttpResponse) {
          this._cache.set(req.url, event); // Update the cache.
        }
      })
    );
  }
}
