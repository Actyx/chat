import { getUserAddedEvent, getUserProfileEditedEvent } from './events';

describe('UserCatalogFish', () => {
  describe('getUserAddedEvent', () => {
    it('should return valid tags and event', () => {
      const result = getUserAddedEvent('user-1', 'Simon', 'simone@gmail.com');

      const expectedTags = {
        rawTags: ['user-catalog', 'user', 'user:user-1'],
      };

      const expectedEvent = {
        type: 'UserAdded',
        payload: {
          userUUID: 'user-1',
          displayName: 'Simon',
          email: 'simone@gmail.com',
          createdBy: 'system-user',
        },
      };

      expect(result).toMatchObject([expectedTags, expectedEvent]);
    });
  });

  describe('getUserProfileEditedEvent', () => {
    it('should return valid tags and event', () => {
      const result = getUserProfileEditedEvent('user-1', 'SPO');

      const expectedTags = {
        rawTags: ['user-catalog', 'user', 'user:user-1'],
      };

      const expectedEvent = {
        type: 'UserProfileEdited',
        payload: {
          userUUID: 'user-1',
          displayName: 'SPO',
          editedBy: 'user-1',
        },
      };

      expect(result).toMatchObject([expectedTags, expectedEvent]);
    });
  });
});
