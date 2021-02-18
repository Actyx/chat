import { getMessageContentEdited, getPublicMessageAdded } from './events';

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
