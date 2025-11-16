import { TestBed } from '@angular/core/testing';

import { ConfigWebService } from './config-web.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('ConfigWebService', () => {
  let service: ConfigWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ConfigWebService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(ConfigWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
