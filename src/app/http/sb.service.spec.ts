import { TestBed } from '@angular/core/testing';

import { SbService } from './sb.service';

describe('SbService', () => {
  const service: SbService = jasmine.createSpyObj(['convert']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ { provide: SbService, useValue: service } ]
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
