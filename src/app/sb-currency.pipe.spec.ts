import { TestBed } from '@angular/core/testing';
import { SbCurrencyPipe } from './sb-currency.pipe';
import { LocalStorageService } from './core/local-storage/local-storage.service';

describe('SbCurrencyPipe', () => {
  let service: LocalStorageService = jasmine.createSpyObj(['getItem']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ { provide: LocalStorageService, useValue: service } ]
    });
  });

  it('create an instance', () => {
    const pipe = new SbCurrencyPipe(service);
    expect(pipe).toBeTruthy();
  });
});
