import {from, Observable, throwError} from 'rxjs';
import {Item} from '../model/Item';
import {Customer} from '../model/customer';
import {Page, PageRequest, Query} from '../model/page';

export type ItemsEndpoint = (id: string) => Observable<Item[]>

export interface ICustomerService {
  filterCustomer(query: Query): Observable<Customer[]>
  delete(customer: Customer): Observable<boolean>
  add(customer: Customer): Observable<Customer>
  update(customer: Customer): Observable<Customer>
  page(request: PageRequest, query: Query): Observable<Page<Customer>>
}

export interface IService<T, Q> {
  add(viewModel: T): Observable<T>

  update(viewModel: T): Observable<T>

  delete(viewModel: T): Observable<boolean>

  page(request: PageRequest, query: Query): Observable<Page<T>>

  getItems(id: string): Observable<Item[]>

  updateItem(item: Q): Observable<Item>

  createItem(item: Q): Observable<Item>

  deleteItem(item: Q): Observable<boolean>
}


