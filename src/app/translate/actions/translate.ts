import { Action } from '@ngrx/store';

export const CHANGE_LOCALE = '[Translate] Change Locale';
export const ADD_TRANSLATIONS = '[Translate] Add Translations';

export class ChangeLocale implements Action {
  readonly type = CHANGE_LOCALE;

  constructor(
    public state: { locale: string, translations: { [key: string]: string } }
  ) { }
}

export class AddTranslations implements Action {
  readonly type = ADD_TRANSLATIONS;

  constructor(
    public state: { translations: { [key: string]: string } }
  ) { }
}

export type Actions = ChangeLocale | AddTranslations;
