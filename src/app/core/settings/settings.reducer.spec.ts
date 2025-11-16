import { initialState, settingsReducer } from './settings.reducer';

import { actionChangeLanguage } from './settings.actions';

describe('SettingsReducer', () => {
  it('should return default state', () => {
    const action = {} as any;
    const state = settingsReducer(undefined, action);
    expect(state).toBe(initialState);
  });

  it('should update language', () => {
    const action = actionChangeLanguage({ language: 'sv' });
    const state = settingsReducer(undefined, action);
    expect(state.language).toEqual('sv');
  });
});
