import { addDefaultChannelIfDoesNotExist } from './addDefaultChannelIfDoesNotExist';

describe('logic', () => {
  describe('addDefaultChannelIfDoesNotExist', () => {
    it('should not add default channel if it is already present', () => {
      const result = addDefaultChannelIfDoesNotExist({
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
      });

      const expectedResult = {
        type: 'error',
        code: 'ChannelDefaultAlredyExist',
        message: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });

    it('should add default channel', () => {
      const result = addDefaultChannelIfDoesNotExist({ channels: {} });

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
