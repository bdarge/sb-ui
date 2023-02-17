import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ROUTE_ANIMATIONS_ELEMENTS} from '../../core/core.module';
import { animate, state, style, transition, trigger} from '@angular/animations';
import { SettingsState, State} from '../../core/settings/settings.model';
import { selectSettings} from '../../core/settings/settings.selectors';
import {actionSettingsChangeLanguage, actionSettingsChangeTheme} from '../../core/settings/settings.actions';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class SettingComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  themes = [
    { value: 'DEFAULT-THEME', label: 'blue' },
    { value: 'LIGHT-THEME', label: 'light' },
    { value: 'NATURE-THEME', label: 'nature' },
    { value: 'BLACK-THEME', label: 'dark' }
  ];

  languages = [
    { value: 'en', label: 'en' },
    { value: 'sv', label: 'sv' }
  ];

  settings$: Observable<SettingsState>

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.settings$ = this.store.pipe(select(selectSettings));
  }

  onThemeSelect({ value: theme }) {
    this.store.dispatch(actionSettingsChangeTheme({ theme }));
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(actionSettingsChangeLanguage({ language }));
  }
}
