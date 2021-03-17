import { editUserProfile } from './editUserProfile';

describe('logic', () => {
  describe('editUserProfile', () => {
    it('should not edit user profile if user is not sign in', () => {
      const result = editUserProfile(
        {
          users: {
            'user-1': {
              userUUID: 'user-1',
              createdOn: 1615299711075000,
              displayName: 'Simone',
              email: 'simone@gmail.com',
            },
          },
          emails: { 'simone@gmail.com': 'user-1' },
        },
        'SPO',
        'anonymous-user'
      );

      const expectedResult = {
        type: 'error',
        code: 'AutheticationUserIsNotSignedIn',
        message: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });

    it('should not edit non existing user profile', () => {
      const result = editUserProfile(
        { users: {}, emails: {} },
        'SPO',
        'user-2'
      );

      const expectedResult = {
        type: 'error',
        code: 'UserEditProfileUserIsNotRegistered',
        message: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });

    it('should not edit user profile without providing a display name', () => {
      const result = editUserProfile(
        {
          users: {
            'user-1': {
              userUUID: 'user-1',
              createdOn: 1615299711075000,
              displayName: 'Simone',
              email: 'simone@gmail.com',
            },
          },
          emails: { 'simone@gmail.com': 'user-1' },
        },
        '',
        'user-1'
      );

      const expectedResult = {
        type: 'error',
        code: 'UserEditProfileDisplayNameIsRequired',
        message: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });

    it('should edit user profile', () => {
      const result = editUserProfile(
        {
          users: {
            'user-1': {
              userUUID: 'user-1',
              createdOn: 1615299711075000,
              displayName: 'Simone',
              email: 'simone@gmail.com',
            },
          },
          emails: { 'simone@gmail.com': 'user-1' },
        },
        'Simone SPO',
        'user-1'
      );

      const expectedTags = {
        rawTags: ['user-catalog', 'user', 'user:user-1'],
      };

      const expectedEvent = {
        type: 'UserProfileEdited',
        payload: {
          userUUID: 'user-1',
          displayName: 'Simone SPO',
          editedBy: 'user-1',
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
