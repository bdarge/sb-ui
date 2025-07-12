import { Pipe, PipeTransform } from '@angular/core';
import { LocalStorageService } from './core/core.module';
import { Language } from './model/user';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Observable, of } from 'rxjs';
import { Currency, CurrencyRec } from './model/transactionItem';

@Pipe({
  name: 'sbCurrency'
})
export class SbCurrencyPipe implements PipeTransform {

  constructor(private localStorageSvc: LocalStorageService) {
  }

  transform(value: number, currencyRec: Observable<CurrencyRec>): Observable<string> {
    return currencyRec.pipe(
      switchMap((rec) => {
        if (!rec) {
          return of('');
        }
        let currentValue = value;
        const selected = this.getLanguage(rec.present.to.toString());
        if (rec.previous) {
           currentValue = Math.round(rec.previous.value.valueOf() * value)
        }
        const result = Math.round(rec.present.value.valueOf() * currentValue)
        return of(Intl.NumberFormat(selected.locale, { style: 'currency', currency: selected.currency }).format(result))
      })
    )
  }

  getLanguage(id: string): Language {
    const lst: Language[] = this.localStorageSvc.getItem('LANGUAGES');
    return lst.find(l => l.currency === id);
  }
}

