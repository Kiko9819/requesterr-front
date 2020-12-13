import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthApiService } from './auth-api.service';
import { AuthState } from './auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {

  loading$: Observable<boolean>;

  constructor(private authState: AuthState,
              private authApiService: AuthApiService) {
    this.loading$ = this.authState.isLoading$();
  }

  // TODO: FIX ANY
  login$(user: any): Observable<any> {
    this.authState.setLoading(true);

    return this.authApiService.login$(user).pipe(
      finalize(() => this.authState.setLoading(false))
    );
  }
}
