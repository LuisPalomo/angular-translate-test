import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Actions } from '../actions/translate';
import { DEFAULT_LOCALE, UPDATE_STATE, ADD_TRANSLATIONS } from '../constants';

export interface TranslateState {
  locale: string;
  translations: { [key: string]: string };
}

export const initialState: TranslateState = {
  locale: DEFAULT_LOCALE,
  translations: {}
};

export function translateReducer(
  state = initialState,
  action: Actions
): TranslateState {
  switch (action.type) {
    case UPDATE_STATE: {
      return { ...state, ...action.payload };
    }

    case ADD_TRANSLATIONS: {
      const translations = { ...state.translations, ...action.payload.translations };
      return { ...state, translations };
    }

    default: {
      return state;
    }
  }
}

/* Selectors */
export const getTranslateState = createFeatureSelector<TranslateState>('translate');
export const getTranslateLocale = createSelector(
  getTranslateState,
  (state: TranslateState) => state.locale
);
export const getTranslateTranslations = createSelector(
  getTranslateState,
  (state: TranslateState) => state.translations
);
