import { archiveChannel } from './archiveChannel';

describe('logic', () => {
  describe('archiveChannel', () => {
    it('should not archive a channel if user is not signed-in', () => {
      const result = archiveChannel(
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

    it('should not archive a channel if channel profile does not exits', () => {
      const result = archiveChannel({ channels: {} }, 'user-1', 'channel-1');

      const expectedResult = {
        type: 'error',
        code: 'ChannelDoesNotExist',
        message: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });

    it('should not archive a channel if user is not the its owner', () => {
      const result = archiveChannel(
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

    it('should archive a channel', () => {
      const result = archiveChannel(
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
});
