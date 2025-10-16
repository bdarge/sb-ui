import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address, Business, User, LanguageResult } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppConfigService } from '../services/app.config.service';

@Injectable()
export class ConfigWebService {
  BUSINESS_URL: string
  USER_URL: string
  ACCOUNT_URL: string
  LANG_URL: string

  constructor(private http: HttpClient, private configService: AppConfigService) {
    this.BUSINESS_URL = `${this.configService.config.apiUrl}/business`
    this.USER_URL = `${this.configService.config.apiUrl}/user`
    this.ACCOUNT_URL = `${this.configService.config.apiUrl}/accounts`
    this.LANG_URL = `${this.configService.config.apiUrl}/lang`
  }

  mapUser(u: User): User {
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

  getBusiness(id: string): Observable<Business> {
    return this.http.get<Business>(this.BUSINESS_URL + '/' + id)
  }

  saveBusiness(value: Business): Observable<Business> {
    return this.http.patch<Business>(this.BUSINESS_URL + '/' + value.id, value)
  }

  getLangs(): Observable<LanguageResult> {
    return this.http.get<LanguageResult>(this.LANG_URL);
  }
}
