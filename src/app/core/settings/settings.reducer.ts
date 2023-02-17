import { Action, createReducer, on } from '@ngrx/store';
import { SettingsState, NIGHT_MODE_THEME } from './settings.model';
import {
  actionSettingsChangeLanguage,
  actionSettingsChangeTheme,
} from './settings.actions';

export const initialState: SettingsState = {
  language: 'en',
  theme: 'DEFAULT-THEME'
};

const reducer = createReducer(
  initialState,
  on(
    actionSettingsChangeLanguage,
    actionSettingsChangeTheme,
    (state, action) => ({ ...state, ...action })
   )
)

export function settingsReducer(
  state: SettingsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
