import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../../shared/shared.module';

describe('NotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      SharedModule,
      NoopAnimationsModule,
      HttpClientTestingModule],
    providers: [NotificationService]
  }));

  it('should be created', () => {
    const service: NotificationService = TestBed.inject(NotificationService);
    expect(service).toBeTruthy();
  });
});
