import { TestBed } from '@angular/core/testing';

import { AuthWebService } from './auth-web.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { LocalStorageService } from 'app/core/local-storage/local-storage.service';

describe('AuthWebService', () => {
  const localStorageSvc = jasmine.createSpyObj(['removeItem']);
  let service: AuthWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthWebService,
        {
          provide: LocalStorageService,
          useValue: localStorageSvc,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(AuthWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
