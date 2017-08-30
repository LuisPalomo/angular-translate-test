import { ActionReducerMap, createSelector } from '@ngrx/store';
import { TranslateState, translateReducer, getLocale, getTranslations } from '../translate/reducers/translate';

export interface AppState {
  translate: TranslateState;
}

export const reducers: ActionReducerMap<AppState> = {
  translate: translateReducer
};

export const getTranslateState = (state: AppState) => state.translate;
export const getTranslateLocale = createSelector(getTranslateState, getLocale);
export const getTranslateTranslations = createSelector(getTranslateState, getTranslations);
