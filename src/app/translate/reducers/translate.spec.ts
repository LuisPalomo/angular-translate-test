import { UpdateState, AddTranslations } from '../actions/translate';
import { translateReducer, initialState, TranslateState, getCurrentLang, getTranslations } from './translate';

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
      const currentLang = 'en';
      const translations = {};
      const update = new UpdateState({ currentLang, translations });

      const result = translateReducer(undefined, update);
      const expectedLocaleResult = currentLang;
      const expectedTranslationsResult = translations;
      expect(result.currentLang).toEqual(expectedLocaleResult);
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
        currentLang: 'en',
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
  const state: TranslateState = {
    currentLang: 'en',
    translations: {
      t1: 't1',
      t2: 't2'
    }
  };

  describe('getLocale', () => {
    it('should return locale', () => {
      const result = getCurrentLang(state);
      const expectedResult = state.currentLang;
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getTranslations', () => {
    it('should return translations', () => {
      const result = getTranslations(state);
      const expectedResult = state.translations;
      expect(result).toEqual(expectedResult);
    });
  });
});
