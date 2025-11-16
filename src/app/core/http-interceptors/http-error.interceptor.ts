import { Injectable, Injector, ErrorHandler } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { AuthWebService } from '../../http/auth-web.service';
import { jwtDecode } from 'jwt-decode';
import { LocalStorageService } from '../local-storage/local-storage.service';

/** Passes HttpErrorResponse to application-wide error handler */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(
    private injector: Injector,
    private auth: AuthWebService,
    private localStorageSvc: LocalStorageService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: any): Observable<any> => {
        if (
          error instanceof HttpErrorResponse &&
          !request.url.includes('auth/login') &&
          error.status === 401
        ) {
          return this.handle401Error(request, next);
        }
        return throwError(() => error);
      }),
      tap({
        error: (error) => {
          // error is here, but we can only call side things.
          const appErrorHandler = this.injector.get(ErrorHandler);
          appErrorHandler.handleError(error);
        },
      })
    );
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      return this.auth.refreshToken().pipe(
        switchMap((result: any) => {
          this.isRefreshing = false;
          const decoded = jwtDecode(result.token);
          this.localStorageSvc.setItem('ACCOUNT', decoded);
          this.localStorageSvc.setItem('TOKEN', result.token);
          const authReq = request.clone({
            withCredentials: true,
            setHeaders: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${result.token}`,
            },
          });
          return next.handle(authReq);
        }),
        catchError((error: any): Observable<any> => {
          this.isRefreshing = false;
          return throwError(() => error);
        })
      );
    }
    return next.handle(request);
  }
}
