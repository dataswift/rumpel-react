import reducer, {
  initialState,
  messages, selectMessages
} from './messagesSlice';

describe('messages slice', () => {
  describe('reducer, actions and selectors', () => {
    it('should return the initial state on first run', () => {
      // Arrange
      const nextState = initialState;

      // Act
      const result = reducer(undefined, { type: {} });

      // Assert
      expect(result).toEqual(nextState);
    });

    it('should properly set the state when initialise the messages', () => {
      // Arrange
      const messageInit = { "message.id": "test message" };

      // Act
      const nextState = reducer(initialState, messages(messageInit));

      // Assert
      const rootState = {
        messages: nextState
      };

      // @ts-ignore
      expect(selectMessages(rootState)).toEqual(messageInit);
    });
  });
});
