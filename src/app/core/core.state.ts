import {
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer
} from '@ngrx/store';
import { settingsReducer } from './settings/settings.reducer';
import { SettingsState } from './settings/settings.model';
import {initStateFromLocalStorage} from './meta-reducers/init-state-from-local-storage.reducer';

export const reducers: ActionReducerMap<AppState> = {
  settings: settingsReducer
};

export const metaReducers: MetaReducer<AppState>[] = [
  initStateFromLocalStorage
];

export const selectSettingsState = createFeatureSelector< SettingsState>('settings');

export interface AppState {
  settings: SettingsState;
}
