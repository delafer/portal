import {AfterViewInit, Component, OnInit} from '@angular/core';
import {GameService} from '$core/services/games.service';
import {Game} from '$common/models';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, merge, pluck, share, startWith, switchMap} from 'rxjs/operators';
import {LocalStorage, LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, AfterViewInit {

  public model: any;

  total$: Observable<number>;
  items$: Observable<Game[]>;

  @LocalStorage()
  terms: string;
  private searchTermStream = new Subject<string>();

  @LocalStorage('ocpage')
  page$: number;

  set page(value: number) {
    this.page$ = value;
    this.goToPage(this.page$);
  }

  get page() {
    return this.page$ ? this.page$ : 1;
  }

  private pageStream = new Subject<number>();

  constructor(protected movieService: GameService, private localSt: LocalStorageService) {
  }


  ngOnInit() {

    this.localSt.observe('ocpage')
      .subscribe((value) => console.log('new value', value));

    const searchSource = this.searchTermStream.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      map(searchTerm => {
        this.terms = searchTerm;
        return {search: searchTerm, page: 1};
      }));

    const pageSource = this.pageStream.pipe(map(pageNumber => {
      this.page$ = pageNumber;
      return {search: this.terms, page: pageNumber};
    }));

    const source = pageSource.pipe(
      merge(searchSource),
      startWith({search: this.terms, page: this.page}),
      switchMap((params: { search: string, page: number }) => {
        return this.movieService.list(params.search, params.page);
      }),
      share()
    );

    this.total$ = source.pipe(pluck('total'));
    this.items$ = source.pipe(pluck('items'));

    console.log('page.onInit: ', this.page);
    //this.page = this.page$;
  }

  search(terms: string) {
    this.searchTermStream.next(terms);
  }

  goToPage(topage: number) {
    console.log(`called for page ${topage}`);
    this.pageStream.next(topage);
  }

  ngAfterViewInit(): void {
    console.log('page.onViewInit: ', this.page);
    //this.page = this.page$;
  }

}
