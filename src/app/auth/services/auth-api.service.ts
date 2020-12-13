import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  readonly url = `${environment.apiUrl}/auth`;
  readonly loginUrl = `${this.url}/signin`;

  constructor(private httpClient: HttpClient) {
  }

  // TODO: FIX ANY
  login$(user: any): Observable<any> {
    console.log(this.loginUrl);
    return this.httpClient.post(this.loginUrl, {email: user.email, password: user.password});
  }
}
