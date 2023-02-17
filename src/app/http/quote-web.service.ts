import { Injectable } from '@angular/core';
import {IService} from '../services/service';
import {Observable} from 'rxjs';
import {Item} from '../model/Item';
import { Page, PageRequest, Query} from '../model/page';
import { HttpClient, HttpParams} from '@angular/common/http';
import { ENVIRONMENT} from '../../environments/environment';
import { QuoteItem} from '../model/quoteItem';
import { Quote} from '../model/quote';

@Injectable({
  providedIn: 'root'
})
export class QuoteWebService implements IService<Quote, QuoteItem>  {
  readonly QUOTE_URL = `${ENVIRONMENT.apiBaseUrl}/quotes`
  readonly QUOTE_ITEM_URL = `${ENVIRONMENT.apiBaseUrl}/quote-items`

  constructor(public http: HttpClient) {}

  page(request: PageRequest, query: Query): Observable<Page<Quote>> {
    const params = new HttpParams()
      .set('page', JSON.stringify(request.page))
      .set('size', JSON.stringify(request.size))
      .set('sortDirection', request.sort.direction)
      .set('sortProperty', request.sort.active)
      .set('search', query.search)

    return this.http.get<Page<Quote>>(
      this.QUOTE_URL,
      {
        params: params
      });
  }

  delete(model: Quote): Observable<boolean> {
    return this.http.delete<boolean>(this.QUOTE_URL + '/' + model.id)
  }

  add(model: Quote): Observable<Quote> {
    const copy = (JSON.parse(JSON.stringify(model)));
    copy.customerId = model.customer.id;
    copy.createdBy = model.account.id;
    delete copy.customer;
    delete copy.user;
    return this.http.post<Quote>(this.QUOTE_URL + '/' + model.id, copy)
  }

  update(model: Quote): Observable<Quote> {
    return this.http.patch<Quote>(this.QUOTE_URL + '/' + model.id, model)
  }

  deleteItem(item: QuoteItem): Observable<boolean> {
    return this.http.delete<boolean>(this.QUOTE_ITEM_URL + '/' + item.id)
  }

  getItems(id: string): Observable<Item[]> {
    return this.http.get<Item[]>(this.QUOTE_URL + '/' + id + '/items')
  }

  updateItem(item: QuoteItem): Observable<Item> {
    return this.http.patch<Item>(this.QUOTE_ITEM_URL + '/' + item.id, item)
  }

  createItem(item: QuoteItem): Observable<Item> {
    return this.http.post<Item>(this.QUOTE_URL + '/' + item.quoteId + '/items', item);
  }
}
