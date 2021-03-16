import { ErrorCode } from '../common/logic-types';
import { archiveChannelLogic } from './logic';

describe('logic', () => {
  describe('archiveChannelLogic', () => {
    it('should not archive a channel if user is not signed-in', () => {
      const result = archiveChannelLogic(
        { channels: {} },
        'anonymous-user',
        'channel-1'
      );

      const expectedResult = {
        type: 'error',
        code: 'AutheticationUserIsNotSignedIn',
        message: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });
  });

  it('should not archive a channel if channel profile does not exits', () => {
    const result = archiveChannelLogic({ channels: {} }, 'user-1', 'channel-1');

    const expectedResult = {
      type: 'error',
      code: ErrorCode.ChannelDoesNotExist,
      message: expect.any(String),
    };

    expect(result).toMatchObject(expectedResult);
  });

  it('should not archive a channel if user is not the its owner', () => {
    const result = archiveChannelLogic(
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
      'user-2',
      'channel-1'
    );

    const expectedResult = {
      type: 'error',
      code: ErrorCode.ChannelUserIsNotOwner,
      message: expect.any(String),
    };

    expect(result).toMatchObject(expectedResult);
  });

  it('should archive a channel', () => {
    const result = archiveChannelLogic(
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
      'channel-1'
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
      type: 'ChannelArchived',
      payload: {
        channelId: 'channel-1',
        archivedBy: 'user-1',
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
