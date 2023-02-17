import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ENVIRONMENT } from '../../environments/environment';
import {Observable} from 'rxjs';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthWebService {
  readonly AUTH_URL = `${ENVIRONMENT.apiBaseUrl}/`
  constructor(private http: HttpClient) {
  }

  login({username, password}) {
    const file = {username: username, password}
    const options = {headers: {'Content-Type': 'application/json'}}
    return this.http.post(this.AUTH_URL + 'auth/login', JSON.stringify(file), options)
  }

  register(value: any): Observable<User> {
    const options = {headers: {'Content-Type': 'application/json'}}
    return this.http.post<User>(this.AUTH_URL + 'accounts', JSON.stringify(value), options)
  }
}
