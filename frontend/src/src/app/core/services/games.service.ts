import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Observable, Subject, of, range} from 'rxjs';
import {catchError, delay, filter, map, tap} from 'rxjs/operators';
import {Game} from '@common/models';
import {environment} from '../../../environments/environment';
import {ListResult} from '../../common/api';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class GameService {
  //https://www.htmlgames.com/html5-games-for-your-site/
  //'https://www.htmlgames.com/rss/games.php?json';  // URL to web api
  private gamesUrl = `${environment.serverUrl}/api/games/`;  // URL to web api

  constructor(
    private http: HttpClient) { }

  list(search: string = null, page: number = 1, limit: number = 8): Observable<ListResult<Game>> {

    let elements: Observable<Game[]> = this.getGames();
    let count = 0;
    if (search) search = search.replace(/^\s+|\s+$/g,'').toLowerCase();
    return elements.pipe(
      map((games : Game[]) => games.filter(p => ((search) ? p.name.toLowerCase().indexOf(search) > 0 || p.description.toLowerCase().indexOf(search) > 0 : true))),
      tap(games => {count = games.length; console.log(`Before: ${games.length}, search: ${search}`)}),
      map ((games: Game[]) => games.slice((page - 1) * limit, page * limit)),
      delay(300),
      tap(games => {console.log(`After: ${games.length}`)}),
      map((games: Game[]) => ({items : games, total: count}))
    );

  }

  /** GET games from the server */
  getGames (): Observable<Game[]> {
    return this.http.get<Game[]>(this.gamesUrl)
      .pipe(
        tap(_ => this.log('fetched games')),
        catchError(this.handleError('getGames', []))
      );
  }

  /** GET game by id. Return `undefined` when id not found */
  getGameNo404<Data>(id: number): Observable<Game> {
    const url = `${this.gamesUrl}/?id=${id}`;


    return this.http.get<Game[]>(url)
      .pipe(
        map(games => games[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} game id=${id}`);
        }),
        catchError(this.handleError<Game>(`getGame id=${id}`))
      );
  }

  /** GET game by id. Will 404 if id not found */
  getGame(id: number): Observable<Game> {
    const url = `${this.gamesUrl}/${id}`;
    return this.http.get<Game>(url).pipe(
      tap(_ => this.log(`fetched game id=${id}`)),
      catchError(this.handleError<Game>(`getGame id=${id}`))
    );
  }

  /* GET games whose name contains search term */
  searchGames(term: string): Observable<Game[]> {
    if (!term.trim()) {
      // if not search term, return empty game array.
      return of([]);
    }
    return this.http.get<Game[]>(`${this.gamesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found games matching "${term}"`)),
      catchError(this.handleError<Game[]>('searchGames', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new game to the server */
  addGame (game: Game): Observable<Game> {
    return this.http.post<Game>(this.gamesUrl, game, httpOptions).pipe(
      tap((game: Game) => this.log(`added game w/ id=${game.id}`)),
      catchError(this.handleError<Game>('addGame'))
    );
  }

  /** DELETE: delete the game from the server */
  deleteGame (game: Game | number): Observable<Game> {
    const id = typeof game === 'number' ? game : game.id;
    const url = `${this.gamesUrl}/${id}`;

    return this.http.delete<Game>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted game id=${id}`)),
      catchError(this.handleError<Game>('deleteGame'))
    );
  }

  /** PUT: update the game on the server */
  updateGame (game: Game): Observable<any> {
    return this.http.put(this.gamesUrl, game, httpOptions).pipe(
      tap(_ => this.log(`updated game id=${game.id}`)),
      catchError(this.handleError<any>('updateGame'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a GameService message with the MessageService */
  private log(message: string) {}
}
