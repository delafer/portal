import {Component, OnInit} from '@angular/core';
import {AppService} from '@app/core/services/app.service';
import {GameService} from '../../../core/services/games.service';
import {Game} from '../../../common/models';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, merge, pluck, share, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // tileList: Game[] = [];
  // page = 1;
  //
  // constructor(private appService: GameService) { }
  //
  // ngOnInit() {
  //   this.getTiles();
  // }
  //
  // getTiles(): void {
  //   this.appService.getGames()
  //     .subscribe(games => {
  //         this.tileList = games.slice(1, 7);
  //         console.log(games.length);
  //       }
  //     );
  // }

  total$: Observable<number>;
  items$: Observable<Game[]>;

  terms: string = "";
  private searchTermStream = new Subject<string>();

  page: number = 1;
  private pageStream = new Subject<number>();

  constructor(protected movieService: GameService) { }

  ngOnInit() {
    const searchSource = this.searchTermStream.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      map(searchTerm => {
        this.terms = searchTerm;
        return {search: searchTerm, page: 1}
      }));

    const pageSource = this.pageStream.pipe(map(pageNumber => {
      this.page = pageNumber;
      return {search: this.terms, page: pageNumber}
    }));

    const source = pageSource.pipe (
      merge(searchSource),
      startWith({search: this.terms, page: this.page}),
      switchMap((params: {search: string, page: number}) => {
        return this.movieService.list(params.search, params.page)
      }),
      share());

    this.total$ = source.pipe(pluck('total'));
    this.items$ = source.pipe(pluck('items'));
  }

  search(terms: string) {
    this.searchTermStream.next(terms)
  }

  goToPage(page: number) {
    this.pageStream.next(page)
  }

}