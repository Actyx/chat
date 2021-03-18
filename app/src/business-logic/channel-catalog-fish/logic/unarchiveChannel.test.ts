import { unarchiveChannel } from './unarchiveChannel';

describe('logic', () => {
  describe('unarchiveChannel', () => {
    it('should not unarchive a channel if user is not signed in', () => {
      const result = unarchiveChannel(
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

    it('should not unarchive if user is not the owner of the channel', () => {
      const result = unarchiveChannel(
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
        code: 'ChannelUserIsNotOwner',
        message: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });

    it('should not unarchive a channel if channel profile does not exits', () => {
      const result = unarchiveChannel({ channels: {} }, 'user-1', 'channel-1');

      const expectedResult = {
        type: 'error',
        code: 'ChannelDoesNotExist',
        message: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });

    it('should unarchive a channel', () => {
      const result = unarchiveChannel(
        {
          channels: {
            'channel-1': {
              profile: {
                channelId: 'channel-1',
                createdOn: 1615466183569000,
                createdBy: 'user-1',
                isArchived: true,
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
        type: 'ChannelUnarchived',
        payload: {
          channelId: 'channel-1',
          unarchivedBy: 'user-1',
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
