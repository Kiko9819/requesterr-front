import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

enum Tokens {
    Access = "access_token",
    Refresh = "refresh_token"
};

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
		sessionStorage.setItem("request_pathname", location.pathname);
    }
    
    getRequestedPath(): string {
		return sessionStorage.getItem("request_pathname") as string;
    }

    removeRequestedPath(): void {
		sessionStorage.removeItem("request_pathname");
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


}