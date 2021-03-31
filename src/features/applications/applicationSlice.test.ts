import reducer, {
  initialState,
  selectApplications,
  apps
} from './applicationsSlice';
import TEST_HAT_APPLICATION from "../../testData/HatApplications";

describe('application slice', () => {
  describe('reducer, actions and selectors', () => {
    it('should return the initial state on first run', () => {
      // Arrange
      const nextState = initialState;

      // Act
      const result = reducer(undefined, { type: {} });

      // Assert
      expect(result).toEqual(nextState);
    });

    it('should properly set the state when initialise the apps', () => {
      // Arrange
      const appsInit = [TEST_HAT_APPLICATION, TEST_HAT_APPLICATION];

      // Act
      const nextState = reducer(initialState, apps(appsInit));

      // Assert
      const rootState = {
        applications: nextState
      };

      // @ts-ignore
      expect(selectApplications(rootState).length).toEqual(2);
    });
  });
});
