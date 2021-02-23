import {
  getChannelAdded,
  getChannelArchived,
  getChannelAssociatedUser,
  getChannelDissociatedUser,
  getChannelProfileEdited,
  getChannelUnarchived,
} from './events';

describe('getChannelAdded', () => {
  it('should return valid tags and event', () => {
    const result = getChannelAdded(
      'channel-1',
      'user-1',
      'marketing',
      'all about marketing'
    );

    const expectedTags = {
      rawTags: [
        'channel-catalog',
        'channel',
        'channel:channel-1',
        'user',
        'user:user-1',
      ],
    };

    const expectedEvent = {
      type: 'ChannelAdded',
      payload: {
        channelId: 'channel-1',
        createdBy: 'user-1',
        name: 'marketing',
        description: 'all about marketing',
      },
    };

    expect(result).toMatchObject([expectedTags, expectedEvent]);
  });
});

describe('getChannelProfileEdited', () => {
  it('should return valid tags and event', () => {
    const result = getChannelProfileEdited(
      'channel-1',
      'user-1',
      'online marketing',
      'all about online marketing'
    );

    const expectedTags = {
      rawTags: [
        'channel-catalog',
        'channel',
        'channel:channel-1',
        'user',
        'user:user-1',
      ],
    };

    const expectedEvent = {
      type: 'ChannelProfileEdited',
      payload: {
        channelId: 'channel-1',
        editedBy: 'user-1',
        name: 'online marketing',
        description: 'all about online marketing',
      },
    };

    expect(result).toMatchObject([expectedTags, expectedEvent]);
  });
});

describe('getChannelArchived', () => {
  it('should return valid tags and event', () => {
    const result = getChannelArchived('channel-1', 'user-1');

    const expectedTags = {
      rawTags: [
        'channel-catalog',
        'channel',
        'channel:channel-1',
        'user',
        'user:user-1',
      ],
    };

    const expectedEvent = {
      type: 'ChannelArchived',
      payload: {
        channelId: 'channel-1',
        archivedBy: 'user-1',
      },
    };

    expect(result).toMatchObject([expectedTags, expectedEvent]);
  });
});

describe('getChannelUnarchived', () => {
  it('should return valid tags and event', () => {
    const result = getChannelUnarchived('channel-1', 'user-1');

    const expectedTags = {
      rawTags: [
        'channel-catalog',
        'channel',
        'channel:channel-1',
        'user',
        'user:user-1',
      ],
    };

    const expectedEvent = {
      type: 'ChannelUnarchived',
      payload: {
        channelId: 'channel-1',
        unarchivedBy: 'user-1',
      },
    };

    expect(result).toMatchObject([expectedTags, expectedEvent]);
  });
});

describe('getChannelAssociatedUser', () => {
  it('should return valid tags and event', () => {
    const result = getChannelAssociatedUser('channel-1', 'user-1');

    const expectedTags = {
      rawTags: [
        'channel-catalog',
        'channel',
        'channel:channel-1',
        'user',
        'user:user-1',
      ],
    };

    const expectedEvent = {
      type: 'ChannelAssociatedUser',
      payload: {
        channelId: 'channel-1',
        userUUID: 'user-1',
      },
    };

    expect(result).toMatchObject([expectedTags, expectedEvent]);
  });
});

describe('getChannelDissociatedUser', () => {
  it('should return valid tags and event', () => {
    const result = getChannelDissociatedUser('channel-1', 'user-1');

    const expectedTags = {
      rawTags: [
        'channel-catalog',
        'channel',
        'channel:channel-1',
        'user',
        'user:user-1',
      ],
    };

    const expectedEvent = {
      type: 'ChannelDissociatedUser',
      payload: {
        channelId: 'channel-1',
        userUUID: 'user-1',
      },
    };

    expect(result).toMatchObject([expectedTags, expectedEvent]);
  });
});
