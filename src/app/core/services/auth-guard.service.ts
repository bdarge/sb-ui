import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {Auth} from './auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router,
              private http: HttpClient,
              private localStorageSvc: LocalStorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.isAuthenticated()) {
      if (state.url.endsWith('login') || state.url.endsWith('register')) {
        this.router.navigate(['/business'])
        return of(false)
      }
      return of(true)
    } else {
      if (state.url.endsWith('login') || state.url.endsWith('register')) {
        return of(true)
      } else {
        this.router.navigate(['/login'])
        return of(false)
      }
    }
  }
  isAuthenticated() {
    const token = this.localStorageSvc.getItem('TOKEN')
    return token && !Auth.hasTokenExpired(token)
  }
}

