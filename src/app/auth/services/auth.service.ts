import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { appConstants } from "src/app/app-constants";
import { Shared } from "src/app/shared/enums/shared.enum";
import { Tokens } from "src/app/shared/enums/tokens.enum";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private jwtHelperService;

    constructor(
        private router: Router
    ) {
        this.jwtHelperService = new JwtHelperService();
    }

    clearSession(): void {
		this.removeAccessToken();
		this.removeRefreshToken();

		location.replace(`${location.origin}/auth`);
	}

    isAccessTokenExpired(token?: string): boolean {
        if (!token) {
			token = this.accessToken;
		}

		if (!token) {
			return true;
		}

		return this.jwtHelperService.isTokenExpired(token);
    }
    
    get accessToken(): string {
		return localStorage.getItem(Tokens.Access) as string;
	}

    get refreshToken(): string {
		return localStorage.getItem(Tokens.Refresh) as string;
    }
    
    set accessToken(token: string) {
		localStorage.setItem(Tokens.Access, token);
	}

	set refreshToken(token: string) {
		localStorage.setItem(Tokens.Refresh, token);
    }
    
    removeAccessToken(): void {
		localStorage.removeItem(Tokens.Access);
	}

	removeRefreshToken(): void {
		localStorage.removeItem(Tokens.Refresh);
    }
    
    setRequestedPath(): void {
		sessionStorage.setItem(Shared.RequestPathName, location.pathname);
    }
    
    getRequestedPath(): string {
		return sessionStorage.getItem(Shared.RequestPathName) as string;
    }

    removeRequestedPath(): void {
		sessionStorage.removeItem(Shared.RequestPathName);
    }

    navigateToLogin(): void {
		this.router.navigate(['/auth/login']);
    }

    navigateToMain(): void {
        const requestedPath = this.getRequestedPath();

		if (requestedPath) {
			this.router.navigate([requestedPath]);

			return;
		}

		this.router.navigate(['/']);
	}

	generateTokenFromClientIdAndSecret(): string {
		return btoa(appConstants.CLIENT_ID_SECRET);
	}

}