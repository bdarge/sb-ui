import { Observable } from 'rxjs';
import { TransactionItem } from '../model/transactionItem';
import { Customer, Customers } from '../model/customer';
import { Page, PageRequest, Query } from '../model/page';
import { Account } from '../model/account';

export type ItemsEndpoint = (id: string) => Observable<TransactionItem[]>

export interface ICustomerService {
  get(query: Query): Observable<Customers>
  delete(customer: Customer): Observable<boolean>
  add(customer: Customer): Observable<Customer>
  update(customer: Customer): Observable<Customer>
  page(request: PageRequest, query: Query): Observable<Page<Customer>>
}

export interface IService<T, Q> {
  add(account: Account, viewModel: T): Observable<T>

  update(viewModel: T): Observable<T>

  delete(viewModel: T): Observable<boolean>

  page(request: PageRequest, query: Query): Observable<Page<T>>

  getItems(id: number): Observable<Page<Q>>

  updateItem(item: Q): Observable<Q>

  createItem(item: Q): Observable<Q>

  deleteItem(item: Q): Observable<boolean>
}


