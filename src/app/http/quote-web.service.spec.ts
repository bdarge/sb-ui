import { TestBed } from '@angular/core/testing';

import { QuoteWebService } from './quote-web.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('QuoteWebService', () => {
  let service: QuoteWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuoteWebService]
    });
    service = TestBed.inject(QuoteWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
