import { hideMessageFromChannel } from './hideMessageFromChannel';

describe('logic', () => {
  describe('hideMessageFromChannel', () => {
    it('should not hide message if user is not sign in', () => {
      const result = hideMessageFromChannel(
        { messages: [] },
        {},
        'channel-1',
        'anonymous-user',
        'message-1'
      );

      const expectedResult = {
        type: 'error',
        code: 'AutheticationUserIsNotSignedIn',
        message: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });

    it('should not hide message if message does not exist', () => {
      const result = hideMessageFromChannel(
        {
          messages: [
            {
              channelId: 'main',
              content: 'Hello world!',
              createdBy: 'user-1',
              messageId: 'message-1',
              createdOn: 1615972672226000,
              isHidden: true,
            },
          ],
        },
        {
          'user-1': {
            userUUID: 'user-1',
            createdOn: 1616071602411000,
            displayName: 'simone',
            email: 'user-1@actyx.io',
            editedOn: 1616076603856000,
          },
        },
        'main',
        'user-1',
        'message-2'
      );

      const expectedResult = {
        type: 'error',
        code: 'MessageDoesNotExist',
        message: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });

    it('should not hide message if user did not created it', () => {
      const result = hideMessageFromChannel(
        {
          messages: [
            {
              channelId: 'main',
              content: 'Hello world!',
              createdBy: 'user-1',
              messageId: 'message-1',
              createdOn: 1615972672226000,
              isHidden: true,
            },
          ],
        },
        {
          'user-2': {
            userUUID: 'user-2',
            createdOn: 1616071602411000,
            displayName: 'simone',
            email: 'user-1@actyx.io',
            editedOn: 1616076603856000,
          },
        },
        'main',
        'user-2',
        'message-1'
      );

      const expectedResult = {
        type: 'error',
        code: 'MessageUserIsNotOwner',
        message: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });

    it('should hide message', () => {
      const result = hideMessageFromChannel(
        {
          messages: [
            {
              channelId: 'main',
              content: 'Hello world!',
              createdBy: 'user-1',
              messageId: 'message-1',
              createdOn: 1615972672226000,
              isHidden: true,
            },
          ],
        },
        {
          'user-1': {
            userUUID: 'user-1',
            createdOn: 1616071602411000,
            displayName: 'simone',
            email: 'user-1@actyx.io',
            editedOn: 1616076603856000,
          },
        },
        'main',
        'user-1',
        'message-1'
      );

      const expectedTags = {
        rawTags: [
          'messages-catalog',
          'channel',
          'channel:main',
          'message',
          'message:message-1',
          'user',
          'user:user-1',
        ],
      };

      const expectedEvent = {
        type: 'MessageHidden',
        payload: {
          messageId: 'message-1',
          hiddenBy: 'user-1',
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
