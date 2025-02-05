import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import {SharedModule} from '../../shared/shared.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {LocalStorageService} from '../local-storage/local-storage.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AuthGuardService', () => {
  let service: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [SharedModule,
        NoopAnimationsModule,
        RouterTestingModule],
    providers: [AuthGuardService, LocalStorageService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
