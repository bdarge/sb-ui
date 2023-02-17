import { Injectable, Injector, ErrorHandler } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {Router} from '@angular/router';

/** Passes token */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private injector: Injector,
              private router: Router,
              private localStorageSvc: LocalStorageService) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.localStorageSvc.getItem('TOKEN');
    if (token) {
      const authReq = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return next.handle(authReq)
    }
    return next.handle(request)
  }
}
