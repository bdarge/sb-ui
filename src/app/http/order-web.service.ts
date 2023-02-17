import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { OrderItem} from '../model/orderItem';
import { IService} from '../services/service';
import { Item} from '../model/Item';
import { Page, PageRequest, Query} from '../model/page';
import { HttpClient, HttpParams} from '@angular/common/http';
import { ENVIRONMENT} from '../../environments/environment';
import { Order} from '../model/order';

@Injectable()
export class OrderWebService implements IService<Order, OrderItem> {
  readonly ORDER_URL = `${ENVIRONMENT.apiBaseUrl}/orders`
  readonly ORDER_ITEM_URL = `${ENVIRONMENT.apiBaseUrl}/order-items`

  constructor(public http: HttpClient) {
  }

  page(request: PageRequest, query: Query): Observable<Page<Order>> {
    const params = new HttpParams()
      .set('page', JSON.stringify(request.page))
      .set('size', JSON.stringify(request.size))
      .set('sortDirection', request.sort.direction)
      .set('sortProperty', request.sort.active)
      .set('search', query.search)

    return this.http.get<Page<Order>>(
      this.ORDER_URL,
      {
        params: params
      })
  }

  delete(order:Order): Observable<boolean> {
    return this.http.delete<boolean>(this.ORDER_URL + '/' + order.id)
  }

  update(order:Order): Observable<Order> {
    return this.http.patch<Order>(this.ORDER_URL + '/' + order.id, order)
  }

  add(order:Order): Observable<Order> {
    const copy = (JSON.parse(JSON.stringify(order)));
    copy.customerId = order.customer.id;
    copy.createdBy = order.account.id;
    delete copy.customer;
    delete copy.user;
    return this.http.post<Order>(this.ORDER_URL, copy);
  }

  deleteItem(item: OrderItem): Observable<boolean> {
    return this.http.delete<boolean>(this.ORDER_ITEM_URL + '/' + item.id)
  }

  getItems(id: string): Observable<Item[]> {
    return this.http.get<Item[]>(this.ORDER_URL + '/' + id + '/items')
  }

  updateItem(item: OrderItem): Observable<Item> {
    return this.http.patch<Item>(this.ORDER_ITEM_URL + '/' + item.id, item);
  }

  createItem(item: OrderItem): Observable<Item> {
    return this.http.post<Item>(this.ORDER_URL + '/' + item.orderId + '/items', item);
  }
}
