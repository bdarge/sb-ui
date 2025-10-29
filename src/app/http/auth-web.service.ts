import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, fromEvent, map, merge, Observable, startWith, Subject, takeUntil, tap, timer } from 'rxjs';
import { User } from '../model/user';
import { AppConfigService } from '../services/app.config.service'
import { Environment } from '../../environments/environment.interface';
import { Router } from '@angular/router';
import { LocalStorageService } from 'app/core/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthWebService {
  config: Environment = null

  constructor(private http: HttpClient, private configService: AppConfigService,
        private router: Router,
        private localStorageSvc: LocalStorageService
  ) {
    this.config = this.configService.config;
  }

  login({username, password}) {
    return this.http.post(this.config.apiUrl + '/auth/login',
      JSON.stringify({email: username, password}), 
      { 
        headers: {'Content-Type': 'application/json'}
      }
    )
  }

  register(value: any): Observable<User> {
    const options = {headers: {'Content-Type': 'application/json'}}
    return this.http.post<User>(this.config.apiUrl + '/accounts', JSON.stringify(value), options)
  }

  refreshToken(): Observable<User> {
    return this.http.post<User>(this.config.apiUrl + '/auth/refresh-token', JSON.stringify({}))
  }

  logout() {
    this.localStorageSvc.removeItem('ACCOUNT')
    this.localStorageSvc.removeItem('TOKEN')
    this.router.navigate(['login'])
  }
}
