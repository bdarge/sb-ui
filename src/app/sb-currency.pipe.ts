import { Pipe, PipeTransform } from '@angular/core';
import { LocalStorageService } from './core/core.module';
import { Language } from './model/user';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Observable, of } from 'rxjs';
import { Currency } from './model/transactionItem';

@Pipe({
  name: 'sbCurrency'
})
export class SbCurrencyPipe implements PipeTransform {

  constructor(private localStorageSvc: LocalStorageService) {
  }

  transform(value: number, currency: Observable<Currency>): Observable<string> {
    return currency.pipe(
      switchMap((d) => {
        if (!d) {
          return of("");
        }
        const selected = this.getLanguage(d.to.toString());
        const result = Math.round((d.value.valueOf() * value + Number.EPSILON) * 100) / 100
        return of(Intl.NumberFormat(selected.locale, { style: 'currency', currency: selected.currency }).format(result))
      })
    )
  }

  getLanguage(id: string): Language {
    const lst: Language[] = this.localStorageSvc.getItem('LANGUAGES');
    return lst.find(l => l.currency == id);
  }
}

