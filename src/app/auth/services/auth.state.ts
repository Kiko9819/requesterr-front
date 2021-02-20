import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthState {

  private loading$ = new BehaviorSubject<boolean>(false);
  private user$ = new BehaviorSubject(null);

  isLoading$(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  setLoading(isLoading: boolean): void {
    this.loading$.next(isLoading);
  }

  setUser(user: any): void {
    this.user$.next(user);
  }

  getUser$(): Observable<any> {
    return this.user$.asObservable();
  }
}
