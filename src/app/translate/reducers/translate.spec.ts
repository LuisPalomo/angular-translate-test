import { UpdateState, AddTranslations } from '../actions/translate';
import {
  translateReducer,
  initialState,
  TranslateState,
  getTranslateLocale,
  getTranslateTranslations
} from './translate';

describe('TranslateReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = translateReducer(undefined, action);
      const expectedResult = initialState;
      expect(result).toEqual(expectedResult);
    });
  });

  describe('UPDATE_STATE', () => {
    it('should update the state with the new information', () => {
      const locale = 'en';
      const translations = {};
      const update = new UpdateState({ locale, translations });

      const result = translateReducer(undefined, update);
      const expectedLocaleResult = locale;
      const expectedTranslationsResult = translations;
      expect(result.locale).toEqual(expectedLocaleResult);
      expect(result.translations).toEqual(expectedTranslationsResult);
    });
  });

  describe('ADD_TRANSLATIONS', () => {
    it('should add the new translations to the old ones', () => {
      const translations = {
        t3: 't3',
        t4: 't4'
      };
      const state = {
        locale: 'en',
        translations: {
          t1: 't1',
          t2: 't2'
        }
      };
      const add = new AddTranslations({ translations });

      const result = translateReducer(state, add).translations;
      const expectedResult = { ...state.translations, ...translations };
      expect(result).toEqual(expectedResult);
    });
  });

});

describe('Translate selectors', () => {
  const translateState: TranslateState = {
    locale: 'en',
    translations: {
      t1: 't1',
      t2: 't2'
    }
  };
  const state = {
    translate: translateState
  };

  describe('getLocale', () => {
    it('should return locale', () => {
      const result = getTranslateLocale(state);
      const expectedResult = translateState.locale;
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getTranslations', () => {
    it('should return translations', () => {
      const result = getTranslateTranslations(state);
      const expectedResult = translateState.translations;
      expect(result).toEqual(expectedResult);
    });
  });
});
