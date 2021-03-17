import { associateUserToChannel } from './associateUserToChannel';

describe('logic', () => {
  describe('associateUserToChannel', () => {
    it('should not associate user if he is not signed in', () => {
      const result = associateUserToChannel(
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

    it('should not associated user if channel does not exist', () => {
      const result = associateUserToChannel(
        {
          channels: {
            main: {
              profile: {
                channelId: 'main',
                createdOn: 1615466183569000,
                createdBy: 'user-1',
                isArchived: false,
                name: 'Main',
              },
              users: ['user-1'],
            },
          },
        },
        'user-1',
        'channel-1'
      );

      const expectedResult = {
        type: 'error',
        code: 'ChannelDoesNotExist',
        message: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });

    it('should not associate user to a channel if he has been already associated', () => {
      const result = associateUserToChannel(
        {
          channels: {
            main: {
              profile: {
                channelId: 'main',
                createdOn: 1615466183569000,
                createdBy: 'user-1',
                isArchived: false,
                name: 'Main',
              },
              users: ['user-1'],
            },
            'marketing-1': {
              profile: {
                channelId: 'marketing-1',
                createdOn: 1615466191122000,
                createdBy: 'user-1',
                isArchived: false,
                name: '',
              },
              users: ['user-1'],
            },
          },
        },
        'user-1',
        'marketing-1'
      );

      const expectedResult = {
        type: 'error',
        code: 'ChannelUserIsAssociated',
        message: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });

    it('should associate user to channel', () => {
      const result = associateUserToChannel(
        {
          channels: {
            main: {
              profile: {
                channelId: 'main',
                createdOn: 1615466183569000,
                createdBy: 'user-1',
                isArchived: false,
                name: 'Main',
              },
              users: ['user-1'],
            },
            'marketing-1': {
              profile: {
                channelId: 'marketing-1',
                createdOn: 1615466191122000,
                createdBy: 'user-1',
                isArchived: false,
                name: '',
              },
              users: ['user-1'],
            },
          },
        },
        'user-2',
        'marketing-1'
      );

      const expectedTags = {
        rawTags: [
          'channel-catalog',
          'channel',
          'channel:marketing-1',
          'user',
          'user:user-2',
        ],
      };

      const expectedEvent = {
        type: 'ChannelAssociatedUser',
        payload: {
          channelId: 'marketing-1',
          userUUID: 'user-2',
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
