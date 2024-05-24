import { createAction, props } from '@ngrx/store';

export const actionChangeLanguage = createAction(
  '[Settings] Change Language',
  props<{ language: string }>()
);

export const actionChangeTheme = createAction(
  '[Settings] Change Theme',
  props<{ theme: string }>()
);

export const actionChangeCurrency = createAction(
  '[Settings] Change Currency',
  props<{ currency: string }>()
);

