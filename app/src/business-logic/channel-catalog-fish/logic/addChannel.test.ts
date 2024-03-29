import { addChannel } from './addChannel';

describe('logic', () => {
  describe('addChannel', () => {
    it('should not add a new channel if user is not signed in', () => {
      const result = addChannel(() => 'channel-1')(
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
      const result = addChannel(() => 'channel-1')(
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
            email: 'user-1@gmail.com',
            editedOn: 1616076603856000,
          },
        },
        'user-1',
        'marketing',
        'all about marketing'
      );

      const resultUntidy = addChannel(() => 'channel-1')(
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
            email: 'user-1@gmail.com',
            editedOn: 1616076603856000,
          },
        },
        'user-1',
        ' MArketing ',
        'all about marketing'
      );

      const expectedResult = {
        type: 'error',
        code: 'ChannelNameExist',
        message: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);

      expect(resultUntidy).toMatchObject(expectedResult);
    });

    it('should add a new channel', () => {
      const result = addChannel(() => 'channel-1')(
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
});
