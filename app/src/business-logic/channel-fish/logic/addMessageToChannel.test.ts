import { addMessageToChannel } from './addMessageToChannel';

describe('logic', () => {
  describe('addMessageToChannel', () => {
    it('should not add message if user is not sign in', () => {
      const result = addMessageToChannel(() => 'message-1')(
        { messages: [] },
        'channel-1',
        'anonymous-user',
        'Hello world!',
        undefined,
        undefined
      );

      const expectedResult = {
        type: 'error',
        code: 'AutheticationUserIsNotSignedIn',
        message: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });

    it('should add message', () => {
      const result = addMessageToChannel(() => 'message-1')(
        { messages: [] },
        'channel-1',
        'user-1',
        'Hello world!',
        undefined,
        undefined
      );

      const expectedTags = {
        rawTags: [
          'messages-catalog',
          'channel',
          'channel:channel-1',
          'message',
          'message:message-1',
          'user',
          'user:user-1',
        ],
      };

      const expectedEvent = {
        type: 'PublicMessageAdded',
        payload: {
          messageId: 'message-1',
          createdBy: 'user-1',
          channelId: 'channel-1',
          content: 'Hello world!',
        },
      };

      const expectedResult = {
        type: 'ok',
        tagsWithEvents: [[expectedTags, expectedEvent]],
        result: undefined,
      };

      expect(result).toMatchObject(expectedResult);
    });
  });
});
