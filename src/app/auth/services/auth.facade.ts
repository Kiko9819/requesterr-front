import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { AuthApiService } from './auth-api.service';
import { AuthService } from './auth.service';
import { AuthState } from './auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {

  loading$: Observable<boolean>;

  constructor(
    private authState: AuthState,
    private authService: AuthService,
    private authApiService: AuthApiService) {
    this.loading$ = this.authState.isLoading$();
  }

  // TODO: FIX ANY
  login$(user: any): Observable<any> {
    this.authState.setLoading(true);

    return this.authApiService.login$(user).pipe(
      tap((user) => this.authState.setUser(user)),
      finalize(() => this.authState.setLoading(false))
    );
  }

  logout$(): Observable<any> {
    return this.authApiService.logout$();
  }

  isAccessTokenExpired(): boolean {
    return this.authService.isAccessTokenExpired();
  }

  clearSession(): void {
    this.authService.clearSession();
  }

  setRequestedPath(): void {
		this.authService.setRequestedPath();
	}

	redirectToLogin(): void {
		this.authService.navigateToLogin();
  }
  
  redirectToMain(): void {
    this.authService.navigateToMain();
  }

}
