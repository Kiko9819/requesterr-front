import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UsersState {

    private myProfileLoading$ = new BehaviorSubject<boolean>(false);

    setMyProfileLoading(isLoading: boolean): void {
        this.myProfileLoading$.next(isLoading);
    }

    getMyProfileLoading$(): Observable<boolean> {
        return this.myProfileLoading$.asObservable();
    }

}