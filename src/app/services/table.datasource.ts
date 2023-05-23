// inspired by https://nils-mehlhorn.de/posts/angular-material-pagination-datasource
import { tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs'
import { switchMap, startWith, map, shareReplay, finalize } from 'rxjs/operators';
import { Page, PaginationEndpoint } from '../model/page';
import { DataSource } from '@angular/cdk/collections';
import { Sort } from '@angular/material/sort';

export class TableDatasource<T, Q> implements DataSource<T> {
  readonly DEFAULT_SIZE = 5;

  public page$: Observable<Page<T>>;
  public query: BehaviorSubject<Q>;

  private pageNumber = new Subject<number>();
  private size: number;
  private readonly sort: BehaviorSubject<Sort>;
  private loading = new Subject<boolean>();

  constructor(
    endpoint: PaginationEndpoint<T, Q>,
    initialSort: Sort,
    initialQuery: Q,
    size = 0) {
    this.size = size || this.DEFAULT_SIZE
    this.sort = new BehaviorSubject<Sort>(initialSort)
    this.query = new BehaviorSubject<Q>(initialQuery)
    this.page$ = combineLatest([this.sort, this.query]).pipe(
      switchMap(([sort, query]) => this.pageNumber.pipe(
        startWith(0),
        switchMap(page => {
          this.loading.next(true)
          return endpoint({page, sort, size: this.size}, query)
            .pipe(tap((a) => {
            }), finalize(() => this.loading.next(false)))
        })
      )),
      shareReplay(1)
    )
  }

  sortBy(sort: Partial<Sort>): void {
    const lastSort = this.sort.getValue()
    const nextSort = {...lastSort, ...sort}
    this.sort.next(nextSort)
  }

  queryBy(query: Partial<Q>): void {
    const lastQuery = this.query.getValue();
    const nextQuery = {...lastQuery, ...query};
    this.query.next(nextQuery);
  }

  fetch(page: number = 0, size: number = this.DEFAULT_SIZE): void {
    this.size = size;
    this.pageNumber.next(page);
  }

  connect(): Observable<T[]> {
    return this.page$.pipe(map(page => page.data));
  }

  disconnect(): void {}
}
