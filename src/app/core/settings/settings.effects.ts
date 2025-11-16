import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { merge, of } from 'rxjs';
import { tap, withLatestFrom, distinctUntilChanged } from 'rxjs/operators';

import { selectSettingsState } from '../core.state';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { AnimationsService } from '../animations/animations.service';

import {
  actionChangeCurrency,
  actionChangeLanguage,
  actionChangeTheme,
} from './settings.actions';

import {
  selectSettingsLanguage,
  selectTheme,
  selectCurrency,
} from './settings.selectors';

import { State } from './settings.model';

export const SETTINGS_KEY = 'SETTINGS';
const INIT = of('business-init-effect-trigger');

@Injectable()
export class SettingsEffects {
  persistSettings = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionChangeLanguage, actionChangeTheme, actionChangeCurrency),
        withLatestFrom(this.store.pipe(select(selectSettingsState))),
        tap(([_, settings]) => {
          this.localStorageService.setItem(SETTINGS_KEY, settings);
        })
      ),
    { dispatch: false }
  );

  setTranslateServiceLanguage = createEffect(
    () =>
      this.store.pipe(
        select(selectSettingsLanguage),
        distinctUntilChanged(),
        tap((language) => {
          this.translateService.use(language);
        })
      ),
    { dispatch: false }
  );

  updateTheme$ = createEffect(
    () =>
      merge(INIT, this.actions$.pipe(ofType(actionChangeTheme))).pipe(
        withLatestFrom(this.store.pipe(select(selectTheme))),
        tap(([action, theme]) => {
          const classList =
            this.overlayContainer.getContainerElement().classList;
          const toRemove = Array.from(classList).filter((item: string) =>
            item.includes('-theme')
          );
          if (toRemove.length) {
            classList.remove(...toRemove);
          }
          classList.add(theme);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private overlayContainer: OverlayContainer,
    private localStorageService: LocalStorageService,
    private translateService: TranslateService
  ) {}
}
