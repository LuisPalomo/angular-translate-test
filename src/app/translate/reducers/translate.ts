import { Actions } from '../actions/translate';
import { DEFAULT_LANG, UPDATE_STATE, ADD_TRANSLATIONS } from '../constants';

export interface TranslateState {
  defaultLang: string;
  currentLang: string;
  translations: { [key: string]: string };
  langs: Array<string>;
}

export const initialState: TranslateState = {
  defaultLang: DEFAULT_LANG,
  currentLang: DEFAULT_LANG,
  translations: {},
  langs: [DEFAULT_LANG]
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
export const getDefaultLang = (state: TranslateState) => state.defaultLang;
export const getCurrentLang = (state: TranslateState) => state.currentLang;
export const getTranslations = (state: TranslateState) => state.translations;
export const getLangs = (state: TranslateState) => state.langs;
