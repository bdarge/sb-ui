import { TestBed } from '@angular/core/testing';

import { DataSignalService } from './data-signal.service';

describe('DataSignalService', () => {
  let service: DataSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
