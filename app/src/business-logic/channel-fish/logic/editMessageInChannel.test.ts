import { editMessageInChannel } from './editMessageInChannel';

describe('logic', () => {
  describe('editMessageInChannel', () => {
    it('should not edit message if user is not sign in', () => {
      const result = editMessageInChannel(
        { messages: [] },
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
              channelId: 'main',
              content: 'Hello world!',
              createdBy: 'user-1',
              messageId: 'message-1',
              createdOn: 1615972672226000,
              isHidden: true,
            },
          ],
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
