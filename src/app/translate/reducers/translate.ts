import { DEFAULT_LOCALE } from '../constants';
import * as translate from '../actions/translate';

export interface TranslateState {
  locale: string;
  translations: { [key: string]: string };
}

const initialState: TranslateState = {
  locale: DEFAULT_LOCALE,
  translations: {}
};

export function translateReducer(
  state = initialState,
  action: translate.Actions
): TranslateState {
  switch (action.type) {
    case translate.CHANGE_LOCALE: {
      return { ...action.state };
    }

    case translate.ADD_TRANSLATIONS: {
      return {
        locale: state.locale,
        translations: { ...state.translations, ...action.state.translations }
      };
    }

    default: {
      return state;
    }
  }
}

// Selectors library
export const getLocale = (state: TranslateState) => state.locale;
export const getTranslations = (state: TranslateState) => state.translations;
