import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthFacade } from "../auth/services/auth.facade";
import { AuthState } from "../auth/services/auth.state";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(
    private authFacade: AuthFacade,
    private router: Router) { }

  canLoad(): boolean {
    const isTokenExpired = this.authFacade.isAccessTokenExpired();

    if (isTokenExpired) {
      this.authFacade.setRequestedPath();
      this.authFacade.clearSession();
      this.authFacade.redirectToLogin();

      return false;
    }

    return true;

  }
}