import { editMessageInChannel } from './editMessageInChannel';

describe('logic', () => {
  describe('editMessageInChannel', () => {
    it('should not edit message if user is not sign in', () => {
      const result = editMessageInChannel(
        { messages: [] },
        {
          'user-1': {
            userUUID: 'user-1',
            createdOn: 1616071602411000,
            displayName: 'simone',
            email: 'user-1@actyx.io',
            editedOn: 1616076603856000,
          },
        },
        'channel-1',
        'anonymous-user',
        'message-1',
        'new content'
      );

      const expectedResult = {
        type: 'error',
        code: 'AutheticationUserIsNotSignedIn',
        message: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });

    it('should not edit message if message does not exist', () => {
      const result = editMessageInChannel(
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
        'message-2',
        'Hello!'
      );

      const expectedResult = {
        type: 'error',
        code: 'MessageDoesNotExist',
        message: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });

    it('should not edit message if user did not created it', () => {
      const result = editMessageInChannel(
        {
          messages: [
            {
              channelId: 'channel-1',
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
          'user-2': {
            userUUID: 'user-2',
            createdOn: 1616071602411000,
            displayName: 'viktor',
            email: 'user-2@actyx.io',
            editedOn: 1616076603856000,
          },
        },
        'main',
        'user-2',
        'message-1',
        'Hello!'
      );

      const expectedResult = {
        type: 'error',
        code: 'MessageUserIsNotOwner',
        message: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });

    it('should edit message', () => {
      const result = editMessageInChannel(
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
        'message-1',
        'Hello!'
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
        type: 'MessageContentEdited',
        payload: {
          messageId: 'message-1',
          content: 'Hello!',
          editedBy: 'user-1',
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
