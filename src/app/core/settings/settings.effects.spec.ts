import { OverlayContainer } from '@angular/cdk/overlay';
import { TranslateService } from '@ngx-translate/core';
import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { TestScheduler } from 'rxjs/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AnimationsService } from '../animations/animations.service'
import {
  LocalStorageService
} from '../local-storage/local-storage.service';

import { SettingsEffects, SETTINGS_KEY } from './settings.effects';
import { SettingsState, State } from './settings.model';
import { actionChangeTheme } from './settings.actions';

const scheduler = new TestScheduler((actual, expected) =>
    expect(actual).toEqual(expected)
);

describe('SettingsEffects', () => {
  let localStorageService: jasmine.SpyObj<LocalStorageService>;
  let overlayContainer: jasmine.SpyObj<OverlayContainer>;
  let translateService: jasmine.SpyObj<TranslateService>;
  let store: jasmine.SpyObj<Store<State>>;

  beforeEach(() => {
    localStorageService = jasmine.createSpyObj('LocalStorageService', [
      'setItem'
    ]);
    overlayContainer = jasmine.createSpyObj('OverlayContainer', [
      'getContainerElement'
    ]);

    translateService = jasmine.createSpyObj('TranslateService', ['use']);
    store = jasmine.createSpyObj('store', ['pipe']);
  });

  describe('persistSettings', () => {
    it('should not dispatch any action', () => {
      const settings: SettingsState = {
        language: 'en',
        currency: 'usd',
        theme: 'default',
      };
      store.pipe.and.returnValue(of(settings));
      const actions = new Actions(of());
      const effect = new SettingsEffects(
        actions,
        store,
        overlayContainer,
        localStorageService,
        translateService
      );
      const metadata = getEffectsMetadata(effect);
      
      expect(metadata.persistSettings.dispatch).toEqual(false);
    });
  });

  it('should call methods on LocalStorageService for PERSIST action', () => {
    scheduler.run(helpers => {
      const { cold } = helpers;

      const settings: SettingsState = {
        language: 'en',
        currency: 'usd',
        theme: 'default',
      };
      store.pipe.and.returnValue(of(settings));
      const persistAction = actionChangeTheme({ theme: 'DEFAULT' });
      const source = cold('a', { a: persistAction });
      const actions = new Actions(source);
      const effect = new SettingsEffects(
        actions,
        store,
        overlayContainer,
        localStorageService,
        translateService
      );

      effect.persistSettings.subscribe(() => {
        expect(localStorageService.setItem).toHaveBeenCalledWith(
          SETTINGS_KEY,
          settings
        );
      });
    });
  });
});
