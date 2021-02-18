import { getUserAddedEvent, getUserProfileEditedEvent } from './events';

describe('getUserAddedEvent', () => {
  it('should return valid tags and event', () => {
    const result = getUserAddedEvent('111', 'Simon', 'simone@gmail.com');

    const expectedTags = {
      rawTags: ['users-catalog', 'user', 'user:111'],
    };

    const expectedEvent = {
      type: 'userAdded',
      payload: {
        userUUID: '111',
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
    const result = getUserProfileEditedEvent('111', 'SPO');

    const expectedTags = {
      rawTags: ['users-catalog', 'user', 'user:111'],
    };

    const expectedEvent = {
      type: 'userProfileEdited',
      payload: {
        userUUID: '111',
        displayName: 'SPO',
        editedBy: '111',
      },
    };

    expect(result).toMatchObject([expectedTags, expectedEvent]);
  });
});
