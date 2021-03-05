import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { MainModule } from "../main.module";

@Injectable({
    providedIn: 'root'
})
export class UsersApiService {

    readonly url = `${environment.apiUrl}/users`;

    constructor(private httpClient: HttpClient) { }

    update(user: any, userId: number): Observable<any> {
        return this.httpClient.patch(`${this.url}/${userId}`, {name: user.name, email: user.email});
    }

    create(user: any): Observable<any> {
        return of(undefined);
    }

    delete(userId: number): Observable<any> {
        return of(undefined);
    }

    getAll(): Observable<any> {
        return of(undefined);
    }
}