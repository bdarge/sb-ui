import { TestBed } from '@angular/core/testing';

import { ConfigWebService } from './config-web.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ConfigWebService', () => {
  let service: ConfigWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConfigWebService]
    });
    service = TestBed.inject(ConfigWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
