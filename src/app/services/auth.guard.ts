import { Injectable } from "@angular/core";
import { CanLoad } from "@angular/router";
import { AuthFacade } from "../auth/services/auth.facade";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(
    private authFacade: AuthFacade) { }

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