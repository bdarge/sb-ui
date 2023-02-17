import { TestBed } from '@angular/core/testing';

import { CustomerWebService } from './customer-web.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CustomerWebService', () => {
  let service: CustomerWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerWebService]
    });
    service = TestBed.inject(CustomerWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
