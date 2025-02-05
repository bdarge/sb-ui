import { TestBed } from '@angular/core/testing';

import { AuthWebService } from './auth-web.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AuthWebService', () => {
  let service: AuthWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [AuthWebService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(AuthWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
