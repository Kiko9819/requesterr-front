import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IUserLoginDTO } from '../models/IUserLoginDTO.interface';
import { IUserLoginResponseDTO } from '../models/IUserLoginResponseDTO.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  readonly url = `${environment.apiUrl}/auth`;
  readonly signInUrl = `${this.url}/signin`;
  readonly signOutUrl = `${this.url}/signout`;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
  }

  login$(user: IUserLoginDTO): Observable<IUserLoginResponseDTO> {
    return this.httpClient.post<IUserLoginResponseDTO>(this.signInUrl, { email: user.email, password: user.password }).pipe(
      tap((response: IUserLoginResponseDTO) => {
        this.authService.accessToken = response.access_token;
        this.authService.refreshToken = response.refresh_token;
      }),
      tap(() => {
        this.authService.navigateToMain();
        this.authService.removeRequestedPath();
      }),
      catchError((response: HttpErrorResponse) => {
        return throwError(response.error);
      })
    );
  }

  // make any => login response
  refreshToken$(): Observable<any> {
    return this.httpClient.post<any>(this.signInUrl, { refresh_token: this.authService.refreshToken });
  }

  logout$(): Observable<void> {
    return this.httpClient.post<void>(this.signOutUrl, { access_token: this.authService.accessToken }).pipe(
      tap(() => this.authService.clearSession())
    );
  }
}
