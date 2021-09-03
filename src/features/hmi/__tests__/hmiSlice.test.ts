import reducer, { initialState, selectParentApp, selectDependencyApps, parentApp, dependencyApps } from '../hmiSlice';
import TEST_HAT_APPLICATION from '../../../testData/HatApplications';

describe('HMI slice', () => {
  describe('reducer, actions and selectors', () => {
    it('should return the initial state on first run', () => {
      // Arrange
      const nextState = initialState;

      // Act
      const result = reducer(undefined, { type: {} });

      // Assert
      expect(result).toEqual(nextState);
    });

    it('should properly set the state when initialise the parent app', () => {
      // Arrange
      const appsInit = TEST_HAT_APPLICATION;

      // Act
      const nextState = reducer(initialState, parentApp(appsInit));

      // Assert
      const rootState = {
        hmi: nextState,
      };

      // @ts-ignore
      expect(selectParentApp(rootState)).toEqual(appsInit);
    });

    it('should properly set the state when initialise the dependency apps', () => {
      // Arrange
      const appsInit = [TEST_HAT_APPLICATION, TEST_HAT_APPLICATION];

      // Act
      const nextState = reducer(initialState, dependencyApps(appsInit));

      // Assert
      const rootState = {
        hmi: nextState,
      };

      // @ts-ignore
      expect(selectDependencyApps(rootState).length).toEqual(2);
    });
  });
});
