import { effect, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Currency } from 'app/model/transactionItem';

@Injectable({
  providedIn: 'root'
})
export class DataSignalService {

  currency: WritableSignal<Currency> = signal(null);

  constructor() { 
  }
}
