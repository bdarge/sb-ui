import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IService } from '../services/service';
import { TransactionItem } from '../model/transactionItem';
import { Page, PageRequest } from '../model/page';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TranQuery, Transaction } from '../model/transaction';
import { Account } from '../model/account';
import { AppConfigService } from '../services/app.config.service';

@Injectable()
export class TransactionWebService
  implements IService<Transaction, TransactionItem>
{
  TRANSACTION_URL = '';

  constructor(
    private http: HttpClient,
    private configService: AppConfigService
  ) {
    this.TRANSACTION_URL = `${this.configService.config.apiUrl}/transaction`;
  }

  page(request: PageRequest, query: TranQuery): Observable<Page<Transaction>> {
    const params = new HttpParams()
      .set('RequestType', query.requestType)
      .set('Page', JSON.stringify(request.page))
      .set('Limit', JSON.stringify(request.size))
      .set('SortDirection', request.sort.direction)
      .set('SortProperty', request.sort.active)
      .set('Search', query.search);

    return this.http.get<Page<Transaction>>(this.TRANSACTION_URL, {
      params: params,
    });
  }

  delete(transaction: Transaction): Observable<boolean> {
    return this.http.delete<boolean>(
      this.TRANSACTION_URL + '/' + transaction.id
    );
  }

  update(transaction: Transaction): Observable<Transaction> {
    return this.http.patch<Transaction>(
      this.TRANSACTION_URL + '/' + transaction.id,
      transaction
    );
  }

  add(account: Account, transaction: Transaction): Observable<Transaction> {
    const copy = JSON.parse(JSON.stringify(transaction));
    copy.customerId = transaction.customer.id;
    copy.createdBy = account.userId;
    delete copy.customer;
    delete copy.user;
    return this.http.post<Transaction>(this.TRANSACTION_URL, copy);
  }

  deleteItem(item: TransactionItem): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.TRANSACTION_URL}/${item.transactionId}/item/${item.id}`
    );
  }

  getItems(transactionId: number): Observable<Page<TransactionItem>> {
    return this.http.get<Page<TransactionItem>>(
      `${this.TRANSACTION_URL}/${transactionId}/item`
    );
  }

  updateItem(item: TransactionItem): Observable<TransactionItem> {
    return this.http.patch<TransactionItem>(
      `${this.TRANSACTION_URL}/${item.transactionId}/item/${item.id}`,
      item
    );
  }

  createItem(item: TransactionItem): Observable<TransactionItem> {
    return this.http.post<TransactionItem>(
      `${this.TRANSACTION_URL}/${item.transactionId}/item`,
      item
    );
  }
}
