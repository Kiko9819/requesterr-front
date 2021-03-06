import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { UsersApiService } from './users-api.service';
import { UsersState } from './users.state';

@Injectable({
    providedIn: 'root'
})
export class UsersFacade {

    myProfileLoading$: Observable<boolean>;

    constructor(
        private usersApiServce: UsersApiService,
        private usersState: UsersState) {
        this.myProfileLoading$ = this.usersState.getMyProfileLoading$();
    }

    // todo figure out user type
    update$(user: any, userId: number): Observable<any> {
        this.usersState.setMyProfileLoading(true);

        return this.usersApiServce.update(user, userId).pipe(
            finalize(() => this.usersState.setMyProfileLoading(false))
        );
    }

    create$(user: any): Observable<any> {
        return this.usersApiServce.create(user);
    }

    delete$(userId: number): Observable<any> {
        return this.usersApiServce.delete(userId);
    }

    getAll$(): Observable<any> {
        return this.usersApiServce.getAll();
    }
}
