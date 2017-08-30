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

// Selectors library
export const getLocale = (state: TranslateState) => state.locale;
export const getTranslations = (state: TranslateState) => state.translations;
