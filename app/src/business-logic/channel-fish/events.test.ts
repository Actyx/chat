import {
  getMessageContentEdited,
  getMessageHiddenEvent,
  getPublicMessageAdded,
} from './events';

describe('ChannelFish', () => {
  describe('getPublicMessageAdded', () => {
    it('should return valid tags and event', () => {
      const result = getPublicMessageAdded({
        messageId: 'message-1',
        createdBy: 'user-1',
        channelId: 'channel-1',
        content: 'Hello world!',
      });

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

      expect(result).toMatchObject([expectedTags, expectedEvent]);
    });
  });

  describe('getMessageContentEdited', () => {
    it('should return valid tags and event', () => {
      const result = getMessageContentEdited(
        'message-1',
        'channel-1',
        'edited message',
        'user-1'
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
        type: 'MessageContentEdited',
        payload: {
          messageId: 'message-1',
          content: 'edited message',
          editedBy: 'user-1',
        },
      };

      expect(result).toMatchObject([expectedTags, expectedEvent]);
    });
  });

  describe('getMessageHiddenEvent', () => {
    it('should return valid tags and event', () => {
      const result = getMessageHiddenEvent('message-1', 'channel-1', 'user-1');

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
        type: 'MessageHidden',
        payload: {
          messageId: 'message-1',
          hiddenBy: 'user-1',
        },
      };

      expect(result).toMatchObject([expectedTags, expectedEvent]);
    });
  });
});
