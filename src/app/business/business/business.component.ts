import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {
  routeAnimations,
  selectTheme,
  LocalStorageService
} from '../../core/core.module';
import {actionSettingsChangeLanguage} from '../../core/settings/settings.actions';
import {State} from '../../core/settings/settings.model';
import {OverlayContainer} from '@angular/cdk/overlay';
import {Account} from '../../model/account';
import {Router} from '@angular/router';

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
    { link: 'setting', label: 'business.menu.setting' }
  ];
  navigationSideMenu = [
    ...this.navigation
  ];

  theme$: Observable<string>
  isAuthenticated$: Observable<boolean>
  user$: Observable<string>

  constructor(
    private router: Router,
    private overlayContainer: OverlayContainer,
    private store: Store<State>,
    private localStorageSvc: LocalStorageService,
  ) {
    this.theme$ = this.store.pipe(select(selectTheme))
    const acct = this.localStorageSvc.getItem('USER') as Account
    const userName: string = acct?.email
    this.user$ = of(userName)
    this.isAuthenticated$ = of(!!userName)
  }

  ngOnInit() {
  }

  onLogoutClick() {
    this.localStorageSvc.removeItem('USER')
    this.localStorageSvc.removeItem('TOKEN')
    this.router.navigate(['login'])
  }
}

