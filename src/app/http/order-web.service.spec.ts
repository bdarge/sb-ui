import { TestBed } from '@angular/core/testing';

import { OrderWebService } from './order-web.service';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Sort} from '@angular/material/sort';
import {Order} from '../model/order';

describe('OrderWebService', () => {
  let service: OrderWebService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderWebService]
    });
    service = TestBed.inject(OrderWebService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<Page<OrderViewModel>>', () => {
    const dummyOrders = {
      content: [
        {id: '5', description: 'bolt'},
        {id: '6', description: 'screw'}
      ]
    };

    service.page({ size: 5, page: 0, sort: { direction: 'asc', active : 'id' } as Sort } as any,
      { search: ''}).subscribe(orders => {
        expect(orders.content.length).toBe(2);
        expect(orders.content).toEqual(dummyOrders.content as Order[]);
    });

    const req = httpMock.expectOne(`${service.ORDER_URL}?page=0&size=5&sortDirection=asc&sortProperty=id&search=`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyOrders);
  });
});
