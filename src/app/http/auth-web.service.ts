import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { AppConfigService } from '../services/app.config.service'
import { Environment } from '../../environments/environment.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthWebService {
  config: Environment = null

  constructor(private http: HttpClient, private configService: AppConfigService) {
    this.config = this.configService.config
  }

  login({username, password}) {
    const file = {email: username, password}
    const options = {headers: {'Content-Type': 'application/json'}}
    return this.http.post(this.config.apiUrl + '/auth/login', JSON.stringify(file), options)
  }

  register(value: any): Observable<User> {
    const options = {headers: {'Content-Type': 'application/json'}}
    return this.http.post<User>(this.config.apiUrl + '/accounts', JSON.stringify(value), options)
  }

  refreshToken(): Observable<User> {
    return this.http.post<User>(this.config.apiUrl + '/auth/refresh-token', JSON.stringify({}))
  }
}
