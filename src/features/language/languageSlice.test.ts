import reducer, {
  initialState,
  language, selectLanguage
} from './languageSlice';

describe('language slice', () => {
  describe('reducer, actions and selectors', () => {
    it('should return the initial state on first run', () => {
      // Arrange
      const nextState = initialState;

      // Act
      const result = reducer(undefined, { type: {} });

      // Assert
      expect(result).toEqual(nextState);
    });

    it('should properly set the state when initialise the language', () => {
      // Arrange
      const langInit = "pl";

      // Act
      const nextState = reducer(initialState, language(langInit));

      // Assert
      const rootState = {
        language: nextState
      };

      // @ts-ignore
      expect(selectLanguage(rootState)).toEqual(langInit);
    });
  });
});
