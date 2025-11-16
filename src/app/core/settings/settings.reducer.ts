import { Action, createReducer, on } from '@ngrx/store';
import { SettingsState } from './settings.model';
import {
  actionChangeLanguage,
  actionChangeTheme,
  actionChangeCurrency,
} from './settings.actions';

export const initialState: SettingsState = {
  language: 'en',
  theme: 'DEFAULT-THEME',
  currency: 'usd',
};

const reducer = createReducer(
  initialState,
  on(
    actionChangeLanguage,
    actionChangeTheme,
    actionChangeCurrency,
    (state, action) => ({ ...state, ...action })
  )
);

export function settingsReducer(
  state: SettingsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
