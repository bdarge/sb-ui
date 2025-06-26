import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currency, CurrencyRequest } from 'app/model/transactionItem';
import { AppConfigService } from 'app/services/app.config.service';
import { Observable, of, switchMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SbService {
  URL: string

  constructor(private http: HttpClient, private configService: AppConfigService) {
    this.URL = `${this.configService.config.apiUrl}`
  }

  convert(req: CurrencyRequest): Observable<Currency> {
    return this.http.post<Currency>(this.URL + '/currency', req);
  }
}
