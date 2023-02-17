import {
  actionSettingsChangeLanguage
} from './settings.actions';
import { NIGHT_MODE_THEME } from './settings.model';

describe('Settings Actions', () => {
  it('should create ActionSettingsChangeLanguage action', () => {
    const action = actionSettingsChangeLanguage({
      language: 'en'
    });

    expect(action.type).toEqual(actionSettingsChangeLanguage.type);
    expect(action.language).toEqual('en');
  });
});
