import { TestBed } from '@angular/core/testing';

import { SbService } from './sb.service';

describe('SbService', () => {
  let service: SbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
