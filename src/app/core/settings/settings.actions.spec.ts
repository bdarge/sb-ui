import {
  actionChangeLanguage
} from './settings.actions';

describe('Settings Actions', () => {
  it('should create ActionSettingsChangeLanguage action', () => {
    const action = actionChangeLanguage({
      language: 'en'
    });

    expect(action.type).toEqual(actionChangeLanguage.type);
    expect(action.language).toEqual('en');
  });
});
