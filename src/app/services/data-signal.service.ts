import { Injectable, signal, WritableSignal } from '@angular/core';
import { CurrencyRec } from 'app/model/transactionItem';

@Injectable({
  providedIn: 'root',
})
export class DataSignalService {
  currencyRec: WritableSignal<CurrencyRec> = signal(null);

  constructor() {}
}
