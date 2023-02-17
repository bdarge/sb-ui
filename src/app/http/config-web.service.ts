import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {ENVIRONMENT} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ConfigWebService{
  readonly USER_URL = `${ENVIRONMENT.apiBaseUrl}/users`
  readonly ACCOUNT_URL = `${ENVIRONMENT.apiBaseUrl}/accounts`
  constructor(public http: HttpClient) {}

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.USER_URL + '/' + id)
  }

  getUserByAcctId(id: string): Observable<User> {
    return this.http.get<User>(this.ACCOUNT_URL + '/' + id + '/user')
  }

  saveUser(user: User): Observable<User> {
    return this.http.patch<User>(this.USER_URL+ '/' + user.id, user)
  }
}
