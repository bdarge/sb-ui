import { TestBed } from '@angular/core/testing';

import { CustomerWebService } from './customer-web.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('CustomerWebService', () => {
  let service: CustomerWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        CustomerWebService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(CustomerWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
