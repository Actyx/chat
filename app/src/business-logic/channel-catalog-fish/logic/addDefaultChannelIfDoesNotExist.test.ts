import { addDefaultChannelIfDoesNotExist } from './addDefaultChannelIfDoesNotExist';

describe('logic', () => {
  describe('addDefaultChannelIfDoesNotExist', () => {
    it('should not add default channel if user is not signed in', () => {
      const result = addDefaultChannelIfDoesNotExist(
        { channels: {} },
        {
          'user-1': {
            userUUID: 'user-1',
            createdOn: 1616071602411000,
            displayName: 'simone',
            email: 'user-1@gmail.com',
            editedOn: 1616076603856000,
          },
        },
        'anonymous-user'
      );

      const expectedResult = {
        type: 'error',
        code: 'AutheticationUserIsNotSignedIn',
        message: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });

    it('should not add default channel if it is already present', () => {
      const result = addDefaultChannelIfDoesNotExist(
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
        {
          'user-1': {
            userUUID: 'user-1',
            createdOn: 1616071602411000,
            displayName: 'simone',
            email: 'user-1@gmail.com',
            editedOn: 1616076603856000,
          },
        },
        'user-1'
      );

      const expectedResult = {
        type: 'error',
        code: 'ChannelDefaultAlredyExist',
        message: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });

    it('should add default channel', () => {
      const result = addDefaultChannelIfDoesNotExist(
        { channels: {} },
        {
          'user-1': {
            userUUID: 'user-1',
            createdOn: 1616071602411000,
            displayName: 'simone',
            email: 'user-1@gmail.com',
            editedOn: 1616076603856000,
          },
        },
        'user-1'
      );

      const expectedTags = {
        rawTags: [
          'channel-catalog',
          'channel',
          'channel:main',
          'user',
          'user:system-user',
        ],
      };

      const expectedEvent = {
        type: 'ChannelAdded',
        payload: {
          channelId: 'main',
          createdBy: 'system-user',
          name: 'Main',
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
