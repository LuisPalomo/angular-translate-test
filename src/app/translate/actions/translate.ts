import { Action } from '@ngrx/store';
import { UPDATE_STATE, ADD_TRANSLATIONS } from '../constants';

export class UpdateState implements Action {
  readonly type = UPDATE_STATE;

  constructor(
    public payload: { currentLang: string, translations: { [key: string]: string } }
  ) { }
}

export class AddTranslations implements Action {
  readonly type = ADD_TRANSLATIONS;

  constructor(
    public payload: { translations: { [key: string]: string } }
  ) { }
}

export type Actions = UpdateState | AddTranslations;
