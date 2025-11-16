import { TestBed } from '@angular/core/testing';
import { TransactionWebService } from './transaction-web.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Sort } from '@angular/material/sort';
import { Transaction } from '../model/transaction';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('TransactionWebService', () => {
  let service: TransactionWebService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        TransactionWebService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(TransactionWebService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should return an Observable<Page<Transaction>>', () => {
  //   const dummyTransactions = {
  //     content: [
  //       {id: '5', description: 'bolt'},
  //       {id: '6', description: 'screw'}
  //     ]
  //   };
  //
  //   service.page({ size: 5, page: 0, sort: { direction: 'asc', active : 'id' } as Sort } as any,
  //     { search: '', requestType: ''}).subscribe(transactions => {
  //       expect(transactions.data.length).toBe(2);
  //       expect(transactions.data).toEqual(dummyTransactions.content as Transaction[]);
  //   });
  //
  //   const req = httpMock.expectOne(`${service.TRANSACTION_URL}?page=0&size=5&sortDirection=asc&sortProperty=id&search=`);
  //   expect(req.request.method).toBe('GET');
  //   req.flush(dummyTransactions);
  // });
});
