import { AppState } from '../core.state';

export const NIGHT_MODE_THEME = 'BLACK-THEME';

export interface SettingsState {
  currency: string;
  language: string;
  theme: string;
}

export interface State extends AppState {
  settings: SettingsState;
}
