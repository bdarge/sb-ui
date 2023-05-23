import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { Address, Business, User } from "../model/user";
import {ENVIRONMENT} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable()
export class ConfigWebService {
  readonly BUSINESS_URL = `${ENVIRONMENT.apiBaseUrl}/business`
  readonly USER_URL = `${ENVIRONMENT.apiBaseUrl}/user`
  readonly ACCOUNT_URL = `${ENVIRONMENT.apiBaseUrl}/accounts`

  constructor(public http: HttpClient) {
  }

  mapUser(u: User): User {
    console.log(u)
    return {
      id: u.id,
      username: u.username,
      business: u.business,
      roles: u.roles,
      address: {
        id: u.address.id,
        street: u.address.street,
        postalCode: u.address.postalCode,
        city: u.address.city,
        country: u.address.country,
        landline: u.address.landline,
        mobile: u.address.mobile,
      } as Address
    } as User
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.USER_URL + '/' + id)
      .pipe(map(this.mapUser))
  }

  getUserByAcctId(id: string): Observable<User> {
    return this.http.get<User>(this.ACCOUNT_URL + '/' + id + '/user')
  }

  saveUser(user: User): Observable<User> {
    return this.http.patch<User>(this.USER_URL + '/' + user.id, user)
      .pipe(map(this.mapUser))
  }

  getBusiness(id: string) {
    return this.http.get<Business>(this.BUSINESS_URL + '/' + id)
  }

  saveBusiness(value: Business): Observable<Business> {
    return this.http.patch<Business>(this.BUSINESS_URL + '/' + value.id, value)
  }
}
