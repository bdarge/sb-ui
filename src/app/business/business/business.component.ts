import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  routeAnimations,
  LocalStorageService
} from '../../core/core.module';
import { Account } from '../../model/account';
import { Router } from '@angular/router';
import { AuthWebService } from 'app/http/auth-web.service';

@Component({
    selector: 'app-business',
    animations: [routeAnimations],
    templateUrl: './business.component.html',
    styleUrls: ['./business.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
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
    private localStorageSvc: LocalStorageService,
    private authService: AuthWebService,
  ) {
    const acct = this.localStorageSvc.getItem('ACCOUNT') as Account
    const userName: string = acct?.email
    this.user$ = of(userName)
    this.isAuthenticated$ = of(!!userName)
  }

  ngOnInit() {
  }

  onLogoutClick() {
    this.authService.logout()
  }
}

