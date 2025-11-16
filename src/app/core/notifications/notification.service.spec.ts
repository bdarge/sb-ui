import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('NotificationService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [SharedModule, NoopAnimationsModule],
      providers: [
        NotificationService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    })
  );

  it('should be created', () => {
    const service: NotificationService = TestBed.inject(NotificationService);
    expect(service).toBeTruthy();
  });
});
