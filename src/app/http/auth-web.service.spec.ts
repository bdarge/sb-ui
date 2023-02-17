import { TestBed } from '@angular/core/testing';

import { AuthWebService } from './auth-web.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AuthWebService', () => {
  let service: AuthWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthWebService]
    });
    service = TestBed.inject(AuthWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
