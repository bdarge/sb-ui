import { createSelector } from '@ngrx/store';
import { SettingsState } from './settings.model';
import { selectSettingsState } from '../core.state';

// based on feature
export const selectSettings = createSelector(
  selectSettingsState,
  (state: SettingsState) => state
);

export const selectSettingsLanguage = createSelector(
  selectSettings,
  (state: SettingsState) => state.language
);

export const selectTheme = createSelector(
  selectSettings,
  (state: SettingsState) => state.theme.toLowerCase()
);

export const selectCurrency = createSelector(
  selectSettings,
  (state: SettingsState) => {
    return state.currency
  }
);
