import { addMessageToChannel } from './addMessageToChannel';

describe('logic', () => {
  describe('addMessageToChannel', () => {
    it('should not add message if user is not sign in', () => {
      const result = addMessageToChannel(() => 'message-1')(
        { messages: [] },
        {
          users: {},
          channels: {},
          channelId: 'channel-1',
          userUUID: 'anonymous-user',
          content: 'Hello world!',
        }
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
        {
          users: {
            'user-1': {
              userUUID: 'user-1',
              createdOn: 1616071602411000,
              displayName: 'simone',
              email: 'user-1@actyx.io',
              editedOn: 1616076603856000,
            },
          },
          channels: {
            'channel-1': {
              profile: {
                channelId: 'channel-1',
                createdOn: 1616071608741000,
                createdBy: 'user-1',
                isArchived: false,
                name: 'Main',
              },
              users: ['user-1'],
            },
          },
          channelId: 'channel-1',
          userUUID: 'user-1',
          content: 'Hello world!',
        }
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
