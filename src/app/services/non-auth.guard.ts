import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { AuthFacade } from '../auth/services/auth.facade';

@Injectable({
	providedIn: 'root'
})
export class NonAuthGuard implements CanLoad {

	constructor(private authFacade: AuthFacade) {
	}

	canLoad(): boolean {
        const isTokenExpired = this.authFacade.isAccessTokenExpired();

		if (!isTokenExpired) {
			this.authFacade.redirectToMain();

			return false;
		}

		return true;
	}
}
