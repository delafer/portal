import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '$environment/environment';
import {UserContext} from '$common/models';
import {Observable, of} from 'rxjs';
import {tap, catchError} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class UserContextContextService {

  private userUrl = `${environment.serverUrl}/api/context`;

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<UserContext[]>(this.userUrl);
  }

  getById(id: number) {
    return this.http.get<UserContext>(`${this.userUrl}/${id}`);
  }

  getByName(name: string) {
    let params = new HttpParams().set('name', name);
    return this.http.get<UserContext>(`${this.userUrl}/`, { params: params });
  }

  /** PUT: update the hero on the server */
  updateByName (UserContext: UserContext): Observable<any> {
    let params = new HttpParams().set('login', name);
    return this.http.post(this.userUrl, UserContext, {params: params}).pipe(
      tap(_ => console.log(`updated hero id=${UserContext}`)),
      catchError(this.handleError<any>('updateByName'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for UserContext consumption
     console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
