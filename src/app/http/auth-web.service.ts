import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { AppConfigService } from '../services/app.config.service'

@Injectable({
  providedIn: 'root'
})
export class AuthWebService {
  AUTH_URL = ''

  constructor(private http: HttpClient, private configService: AppConfigService) {
    this.AUTH_URL = `${this.configService.config.apiUrl}/`
  }

  login({username, password}) {
    const file = {email: username, password}
    const options = {headers: {'Content-Type': 'application/json'}}
    return this.http.post(this.AUTH_URL + 'auth/login', JSON.stringify(file), options)
  }

  register(value: any): Observable<User> {
    const options = {headers: {'Content-Type': 'application/json'}}
    return this.http.post<User>(this.AUTH_URL + 'accounts', JSON.stringify(value), options)
  }
}
