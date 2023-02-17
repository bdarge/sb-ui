import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, from, Observable, of} from 'rxjs';
import {Item} from '../model/Item';
import {ItemsEndpoint} from './service';
import {switchMap} from 'rxjs/operators';
import {Query} from '../model/page';

export class ItemDatasource implements DataSource<Item> {
  public query: BehaviorSubject<Query>
  public page$: Observable<Item[]>

  constructor(
    query: Query,
    service: ItemsEndpoint) {
    this.query = new BehaviorSubject(query)
    this.page$ = this.query.pipe(
      switchMap((q) => !q.id ? [] : service(q.id)
      ))
  }

  connect(): Observable<Item[]> {
    return this.page$
  }

  disconnect() {
  }

  fetch(query: Query) {
    const lastQuery = this.query.getValue();
    const nextQuery = {...lastQuery, ...query};
    this.query.next(nextQuery);
  }
}
