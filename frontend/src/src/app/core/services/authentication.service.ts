import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '@environment/environment';
import { map } from 'rxjs/operators';
import { User } from '@common/models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {

      const params = new HttpParams({
        fromObject: {
          client_id: 'portal',
          username: username,
          password: password,
          grant_type: 'password',
          client_secret: environment.authSecret
        }
      });
      /*this.http.post<any>(`${environment.serverUrl}/api/users/authenticate`, { username, password })*/
      return this.http.post<any>(`${environment.serverUrl}/api/users/jwt`,  params )
            .pipe(map(user => {
                console.log('Login successful');
                // login successful if there's a jwt token in the response
                if (user && user.access_token) {
                    console.log('JWT Token present');
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
