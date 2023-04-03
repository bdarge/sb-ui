import { Injectable } from '@angular/core';
import { ICustomerService } from '../services/service';
import { Observable } from 'rxjs';
import { Customer, Customers } from "../model/customer";
import { ENVIRONMENT } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PageRequest, Page, Query } from 'app/model/page';

@Injectable({
  providedIn: 'root'
})
export class CustomerWebService implements ICustomerService {
  readonly CUSTOMER_URL = `${ENVIRONMENT.apiBaseUrl}/customer`

  constructor(private http: HttpClient) {}

  page(request: PageRequest, query: Query): Observable<Page<Customer>> {
    const params = new HttpParams()
      .set('Page', JSON.stringify(request.page))
      .set('Size', JSON.stringify(request.size))
      .set('SortDirection', request.sort.direction)
      .set('SortProperty', request.sort.active)
      .set('Search', query.search)

    return this.http.get<Page<Customer>>(
      this.CUSTOMER_URL,
      {
        params: params
      })
  }

  delete(customer: Customer): Observable<boolean> {
    const url = this.CUSTOMER_URL + '/' + customer.id
    return this.http.delete<boolean>(url)
  }

  add(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.CUSTOMER_URL, customer);
  }

  update(customer: Customer): Observable<Customer> {
    return this.http.patch<Customer>(this.CUSTOMER_URL + '/' + customer.id, customer);
  }

  get(query: Query): Observable<Customers> {
    const params = new HttpParams()
      .set('Search', query.search)

    return this.http.get<Customers>(
      this.CUSTOMER_URL,
      {
        params: params
      });
  }
}
