import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, switchMap, take } from "rxjs/operators";
import { BehaviorSubject, EMPTY, throwError } from 'rxjs';
import { AuthApiService } from './auth/services/auth-api.service';
import { AuthService } from './auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

	private refreshTokenInProgress: boolean;
	private refreshTokenSubject$ = new BehaviorSubject<string | null>(null);

  constructor(
		private authApiService: AuthApiService,
		private authService: AuthService
	) {
	}

  intercept(req: HttpRequest<Object>, next: HttpHandler) {
    req = this.attachHeaders(req);

    return next.handle(req)
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          if (errorResponse.status === 401) {
            if (this.refreshTokenInProgress) {
              return this.refreshTokenSubject$.pipe(
                filter(accessToken => accessToken !== null),
                take(1),
                switchMap(() => next.handle(this.addAuthenticationToken(req)))
              );
            } else {
              this.refreshTokenInProgress = true;
              this.refreshTokenSubject$.next(null);
  
              return this.authApiService.refreshToken$().pipe(
                switchMap((loginResponse: any) => {
                  this.authService.accessToken = loginResponse.access_token;
                  this.authService.refreshToken = loginResponse.refresh_token;
  
                  this.refreshTokenInProgress = false;
                  this.refreshTokenSubject$.next(loginResponse.access_token);
  
                  return next.handle(this.addAuthenticationToken(req));
                }),
                catchError(() => {
                  this.refreshTokenInProgress = false;
                  this.authService.setRequestedPath();
                  this.authService.clearSession();
  
                  return EMPTY;
                })
              );
            }
          }
          return throwError(errorResponse);
        })
      );
  }

  addAuthenticationToken(request: HttpRequest<Object>): HttpRequest<Object> {
		const accessToken = this.authService.accessToken;

		if (!accessToken) {
			return request;
		}

		return request.clone({
			setHeaders: {
				Authorization: `Bearer ${accessToken}`
			}
		});
	}


  private attachHeaders(req: HttpRequest<object>): HttpRequest<object> {
    if (req.url === this.authApiService.signInUrl) {
			return req.clone({
				setHeaders: {
					authorization: `Basic ${this.authService.generateTokenFromClientIdAndSecret()}`
				}
			});
		}

		return this.addAuthenticationToken(req);

  }
}
