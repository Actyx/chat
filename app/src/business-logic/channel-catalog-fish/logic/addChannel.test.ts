import { addChannelLogic } from './addChannel';

describe('addChannelLogic', () => {
  it('should not add a new channel if user is not signed-in', () => {
    const result = addChannelLogic(() => 'channel-1')(
      { channels: {} },
      'anonymous-user',
      'marketing',
      'all about marketing'
    );

    const expectedResult = {
      type: 'error',
      code: 'AutheticationUserIsNotSignedIn',
      message: expect.any(String),
    };

    expect(result).toMatchObject(expectedResult);
  });

  it('should not add a new channel if new channel name already exits', () => {
    const result = addChannelLogic(() => 'channel-1')(
      {
        channels: {
          'channel-1': {
            profile: {
              channelId: 'channel-1',
              createdOn: 1615466183569000,
              createdBy: 'user-1',
              isArchived: false,
              name: 'marketing',
            },
            users: ['user-1'],
          },
        },
      },
      'user-1',
      'marketing',
      'all about marketing'
    );

    const resultUntidy = addChannelLogic(() => 'channel-1')(
      {
        channels: {
          'channel-1': {
            profile: {
              channelId: 'channel-1',
              createdOn: 1615466183569000,
              createdBy: 'user-1',
              isArchived: false,
              name: 'marketing',
            },
            users: ['user-1'],
          },
        },
      },
      'user-1',
      ' MArketing ',
      'all about marketing'
    );

    const expectedResult = {
      type: 'error',
      code: 'ChannelAddChannelNameExist',
      message: expect.any(String),
    };

    expect(result).toMatchObject(expectedResult);

    expect(resultUntidy).toMatchObject(expectedResult);
  });

  it('should add a new channel', () => {
    const result = addChannelLogic(() => 'channel-1')(
      { channels: {} },
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

    const expectedResult = {
      type: 'ok',
      tagsWithEvents: [[expectedTags, expectedEvent]],
    };

    expect(result).toMatchObject(expectedResult);
  });
});
