import { initialState, settingsReducer } from './settings.reducer';

import {
  actionSettingsChangeLanguage
} from './settings.actions';

describe('SettingsReducer', () => {
  it('should return default state', () => {
    const action = {} as any;
    const state = settingsReducer(undefined, action);
    expect(state).toBe(initialState);
  });

  it('should update language', () => {
    const action = actionSettingsChangeLanguage({ language: 'sv' });
    const state = settingsReducer(undefined, action);
    expect(state.language).toEqual('sv');
  });
});
