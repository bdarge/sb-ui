import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  routeAnimations,
  LocalStorageService
} from '../../core/core.module';
import { State } from '../../core/settings/settings.model';
import { Account } from '../../model/account';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business',
  animations: [routeAnimations],
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessComponent implements OnInit {
  navigation = [
    { link: 'home', label: 'business.menu.home' },
    { link: 'profile', label: 'business.menu.profile' },
    { link: 'setting', label: 'business.menu.setting' },
    { link: 'about', label: 'business.menu.about' }
  ];
  navigationSideMenu = [
    ...this.navigation
  ];

  theme$: Observable<string>
  isAuthenticated$: Observable<boolean>
  user$: Observable<string>

  constructor(
    private router: Router,
    private localStorageSvc: LocalStorageService
  ) {
    const acct = this.localStorageSvc.getItem('ACCOUNT') as Account
    const userName: string = acct?.email
    this.user$ = of(userName)
    this.isAuthenticated$ = of(!!userName)
  }

  ngOnInit() {
  }

  onLogoutClick() {
    this.localStorageSvc.removeItem('ACCOUNT')
    this.localStorageSvc.removeItem('TOKEN')
    this.router.navigate(['login'])
  }
}

