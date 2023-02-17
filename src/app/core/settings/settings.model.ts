import { AppState } from '../core.state';

export const NIGHT_MODE_THEME = 'BLACK-THEME';

export type Language = 'en' | 'sv';

export interface SettingsState {
  language: string;
  theme: string;
}

export interface State extends AppState {
  settings: SettingsState;
}
