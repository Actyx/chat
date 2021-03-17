import { dissociateUserChannel } from './dissociateUserChannel';

describe('logic', () => {
  describe('dissociateUserChannel', () => {
    it('should not dissociate user if he is not signed in', () => {
      const result = dissociateUserChannel(
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

    it('should not dissociate user if channel does not exist', () => {
      const result = dissociateUserChannel(
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

    it('should not dissociate user from a channel if he has been already dissociated', () => {
      const result = dissociateUserChannel(
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

      const expectedResult = {
        type: 'error',
        code: 'ChannelUserIsNotAssociated',
        message: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });

    it('should dissociate user from channel', () => {
      const result = dissociateUserChannel(
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
              users: ['user-1', 'user-2'],
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
        type: 'ChannelDissociatedUser',
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
