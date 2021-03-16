import { editUserProfileLogic, signUpLogic } from './logic';

describe('logic', () => {
  describe('signUpLogic', () => {
    it('should register a new user if his email is not already registered', () => {
      const result = signUpLogic(() => 'user-1')(
        { users: {}, emails: {} },
        'Simone',
        'simone@gmail.com'
      );

      const expectedTags = {
        rawTags: ['user-catalog', 'user', 'user:user-1'],
      };

      const expectedEvent = {
        type: 'UserAdded',
        payload: {
          userUUID: 'user-1',
          displayName: 'Simone',
          email: 'simone@gmail.com',
          createdBy: 'system-user',
        },
      };

      const expectedResult = {
        type: 'ok',
        tagsWithEvents: [[expectedTags, expectedEvent]],
      };

      expect(result).toMatchObject(expectedResult);
    });

    it('should not register a new user if his email is already registered', () => {
      const result = signUpLogic(() => 'user-1')(
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
        'Simone',
        'simone@gmail.com'
      );

      const expectedResult = {
        type: 'error',
        code: 'SignUpEmailAlreadyExists',
        message: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });
  });

  describe('editUserProfileLogic', () => {
    it('should not allow an anonymous user to edit a profile', () => {
      const result = editUserProfileLogic(
        'SPO',
        'anonymous-user'
      )({
        users: {
          'user-1': {
            userUUID: 'user-1',
            createdOn: 1615299711075000,
            displayName: 'Simone',
            email: 'simone@gmail.com',
          },
        },
        emails: { 'simone@gmail.com': 'user-1' },
      });

      const expectedResult = {
        type: 'error',
        code: 'AutheticationUserIsNotSignedIn',
        message: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });

    it('should not allow a user trying to edit a profile when they are not registered', () => {
      const result = editUserProfileLogic(
        'SPO',
        'user-2'
      )({ users: {}, emails: {} });

      const expectedResult = {
        type: 'error',
        code: 'UserEditProfileUserIsNotRegistered',
        message: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });

    it('should not allow a user trying to edit a profile without providing a display name', () => {
      const result = editUserProfileLogic(
        '',
        'user-1'
      )({
        users: {
          'user-1': {
            userUUID: 'user-1',
            createdOn: 1615299711075000,
            displayName: 'Simone',
            email: 'simone@gmail.com',
          },
        },
        emails: { 'simone@gmail.com': 'user-1' },
      });

      const expectedResult = {
        type: 'error',
        code: 'UserEditProfileDisplayNameIsRequired',
        message: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });

    it('should allow editing the user profile', () => {
      const result = editUserProfileLogic(
        'Simone SPO',
        'user-1'
      )({
        users: {
          'user-1': {
            userUUID: 'user-1',
            createdOn: 1615299711075000,
            displayName: 'Simone',
            email: 'simone@gmail.com',
          },
        },
        emails: { 'simone@gmail.com': 'user-1' },
      });

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
