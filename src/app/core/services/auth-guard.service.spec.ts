import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import {SharedModule} from '../../shared/shared.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {LocalStorageService} from '../local-storage/local-storage.service';

describe('AuthGuardService', () => {
  let service: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [AuthGuardService, LocalStorageService]
    });
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
