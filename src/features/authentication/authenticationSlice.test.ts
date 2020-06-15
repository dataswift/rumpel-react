import reducer, {
  initialState,
  authenticateWithToken,
  selectAuthToken,
  selectIsAuthenticated
} from './authenticationSlice';

describe('auth slice', () => {
  describe('reducer, actions and selectors', () => {
    it('should return the initial state on first run', () => {
      // Arrange
      const nextState = initialState;

      // Act
      const result = reducer(undefined, { type: {} });

      // Assert
      expect(result).toEqual(nextState);
    });

    it('should properly set the state when sign in is made', () => {
      // Arrange
      // eslint-disable-next-line max-len
      const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxLThFZDNIbm5CcWVyM3VUVkdMOVhUR0tzYnZxbmt5OVwvVmtnU2praVZkY3NqVllPMDVKVzBadDRBanNSdWZqVVlhTmdqcm1KUFZGS2x2YTRzV3YwK2trajZ1V3BTR0w3NklSRkVTR21mM2s3WjJoS1wvXC9XYnM9IiwicmVzb3VyY2UiOiJ0ZXN0bGV5dGlzMTk0Lmh1YmF0Lm5ldCIsImFjY2Vzc1Njb3BlIjoib3duZXIiLCJpc3MiOiJ0ZXN0bGV5dGlzMTk0Lmh1YmF0Lm5ldCIsImV4cCI6MTU4OTk2NDg3MCwiaWF0IjoxNTg3MzcyODcwLCJqdGkiOiJkNDJhODAzYTg1YjhkMDMwMGIzOTc2ODk0NmE0MjAyNjYwNzZjNTc4ZTkxMTk4YmY2ZDI5OTg3N2UwODVjODQzZGJmMGJiNDM2NDIxODY1Y2Q4YmEzN2JhMDE4NTcxMjBkMmEyN2YzMTdmODA5ZWFjYjZhZWQ5MzQ2YjQ2MDM2OTk3NjY2MTNkYWNjYTc4NDc2ZWJiMmZmNzZkZjRjM2M4ZjQ5NTE2ODU1NmM2MTk4ZmUwMTc4NjFmYjMxYmFiZWFhZmRiNjg0Y2IzNDk4YWRkMGExYTkzMGYzMDkyNWU1NmQzNTVlMjg4NDVkMWZlYzA4OTU5ZmJmMTNiZGYxN2EwIn0.hYY7Jlt0kMD5jV0z-d7u_Ldku7PrVx3wyzpf5_BKGChrk_uV24C2mda8ODDBSl332afMaIc3gUEHM0ly9KHdmoevHX7jzbNTnic8BHUsDLLjY1Wd7ugBMUfKA_vBQYb1tqpMHxIYzUulOHN6mnB933A9NgB_bLK6KML7mq3hqD6MkxQwUw-tjPO935oNy1X7Bb14g_3YpLwJngpBs1LngNy0AkBosNtcekRG4BObHS3OWpZFG17qHdI29JBifayKSxxfGPx36K00Mn1hi0GVE11kAWrqPGxobuvLOc2KQAduaouSdCzqP4tXVDp8Q9oIE1OTX1FZAkgISG0CLF-f_g";

      // Act
      const nextState = reducer(initialState, authenticateWithToken(token));


      // Assert
      const rootState = {
        authentication: nextState
      };

      // @ts-ignore
      expect(selectIsAuthenticated(rootState)).toEqual(true);
      // @ts-ignore
      expect(selectAuthToken(rootState)).toEqual(token);
    });

    it('should properly set the state when sign in is made', () => {
      // Arrange
      // eslint-disable-next-line max-len
      const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxLThFZDNIbm5CcWVyM3VUVkdMOVhUR0tzYnZxbmt5OVwvVmtnU2praVZkY3NqVllPMDVKVzBadDRBanNSdWZqVVlhTmdqcm1KUFZGS2x2YTRzV3YwK2trajZ1V3BTR0w3NklSRkVTR21mM2s3WjJoS1wvXC9XYnM9IiwicmVzb3VyY2UiOiJ0ZXN0bGV5dGlzMTk0Lmh1YmF0Lm5ldCIsImFjY2Vzc1Njb3BlIjoib3duZXIiLCJpc3MiOiJ0ZXN0bGV5dGlzMTk0Lmh1YmF0Lm5ldCIsImV4cCI6MTU4OTk2NDg3MCwiaWF0IjoxNTg3MzcyODcwLCJqdGkiOiJkNDJhODAzYTg1YjhkMDMwMGIzOTc2ODk0NmE0MjAyNjYwNzZjNTc4ZTkxMTk4YmY2ZDI5OTg3N2UwODVjODQzZGJmMGJiNDM2NDIxODY1Y2Q4YmEzN2JhMDE4NTcxMjBkMmEyN2YzMTdmODA5ZWFjYjZhZWQ5MzQ2YjQ2MDM2OTk3NjY2MTNkYWNjYTc4NDc2ZWJiMmZmNzZkZjRjM2M4ZjQ5NTE2ODU1NmM2MTk4ZmUwMTc4NjFmYjMxYmFiZWFhZmRiNjg0Y2IzNDk4YWRkMGExYTkzMGYzMDkyNWU1NmQzNTVlMjg4NDVkMWZlYzA4OTU5ZmJmMTNiZGYxN2EwIn0.hYY7Jlt0kMD5jV0z-d7u_Ldku7PrVx3wyzpf5_BKGChrk_uV24C2mda8ODDBSl332afMaIc3gUEHM0ly9KHdmoevHX7jzbNTnic8BHUsDLLjY1Wd7ugBMUfKA_vBQYb1tqpMHxIYzUulOHN6mnB933A9NgB_bLK6KML7mq3hqD6MkxQwUw-tjPO935oNy1X7Bb14g_3YpLwJngpBs1LngNy0AkBosNtcekRG4BObHS3OWpZFG17qHdI29JBifayKSxxfGPx36K00Mn1hi0GVE11kAWrqPGxobuvLOc2KQAduaouSdCzqP4tXVDp8Q9oIE1OTX1FZAkgISG0CLF-f_g";

      // Act
      const nextState = reducer(initialState, authenticateWithToken(token));


      // Assert
      const rootState = {
        authentication: nextState
      };

      // @ts-ignore
      expect(selectIsAuthenticated(rootState)).toEqual(true);
      // @ts-ignore
      expect(selectAuthToken(rootState)).toEqual(token);
    });
  });
});
