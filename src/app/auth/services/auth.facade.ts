import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { IUserLoginDTO } from '../models/IUserLoginDTO.interface';
import { IUserLoginResponseDTO } from '../models/IUserLoginResponseDTO.interface';
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

  login$(user: IUserLoginDTO): Observable<IUserLoginResponseDTO> {
    this.authState.setLoading(true);

    return this.authApiService.login$(user).pipe(
      tap((loginResponse: IUserLoginResponseDTO) => this.authState.setUser(loginResponse)),
      finalize(() => this.authState.setLoading(false))
    );
  }

  logout$(): Observable<void> {
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
