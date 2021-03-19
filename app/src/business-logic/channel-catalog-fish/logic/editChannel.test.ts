import { editChannel } from './editChannel';

describe('logic', () => {
  describe('editChannel', () => {
    it('should not edit a new channel if user is not signed in', () => {
      const result = editChannel(
        { channels: {} },
        {},
        'anonymous-user',
        'channel-1',
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

    it('should not edit a channel if channel profile does not exits', () => {
      const result = editChannel(
        { channels: {} },
        {
          'user-1': {
            userUUID: 'user-1',
            createdOn: 1616071602411000,
            displayName: 'simone',
            email: 'user-1@actyx.io',
            editedOn: 1616076603856000,
          },
        },
        'user-1',
        'channel-1',
        'marketing',
        'all about marketing'
      );

      const expectedResult = {
        type: 'error',
        code: 'ChannelDoesNotExist',
        message: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });

    it('should update channel description', () => {
      const result = editChannel(
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
        {
          'user-1': {
            userUUID: 'user-1',
            createdOn: 1616071602411000,
            displayName: 'simone',
            email: 'user-1@actyx.io',
            editedOn: 1616076603856000,
          },
        },
        'user-1',
        'channel-1',
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
        type: 'ChannelProfileEdited',
        payload: {
          channelId: 'channel-1',
          editedBy: 'user-1',
          name: 'marketing',
          description: 'all about marketing',
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
