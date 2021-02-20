import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Tokens } from 'src/app/shared/enums/tokens.enum';
import { environment } from '../../../environments/environment';
import { IUserLoginDTO } from '../models/IUserLoginDTO.interface';
import { IUserLoginResponseDTO } from '../models/IUserLoginResponseDTO.interface';
import { AuthService } from './auth.service';
import { AuthState } from './auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  readonly url = `${environment.apiUrl}/auth`;
  readonly signInUrl = `${this.url}/signin`;
  readonly signOutUrl = `${this.url}/signout`;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private authState: AuthState
    ) {
  }

  login$(user: IUserLoginDTO): Observable<IUserLoginResponseDTO> {
    return this.httpClient.post<IUserLoginResponseDTO>(this.signInUrl, {email: user.email, password: user.password}).pipe(
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
		const body = new FormData();
		body.append(Tokens.Refresh, this.authService.refreshToken);

		return this.httpClient.post<any>(this.signInUrl, body);
  }
  
  logout$(): Observable<void> {
    // TODO: probably handle form data on the api side
		// const body = new FormData();
		// body.append('access_token', this.authService.accessToken);

		return this.httpClient.post<void>(this.signOutUrl, {access_token: this.authService.accessToken}).pipe(
			tap(() => this.authService.clearSession())
		);
	}


}
