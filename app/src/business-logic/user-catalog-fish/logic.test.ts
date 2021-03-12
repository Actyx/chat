import { editUserProfileLogic, signUpLogic } from './logic';

describe('logic', () => {
  describe('signUpLogic', () => {
    it('should register a new user if his email is not already registered', () => {
      const result = signUpLogic(() => 'user-1', {
        users: {},
        emails: {},
      })('Simone', 'simone@gmail.com');

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
        status: 'ok',
        tagsWithEvents: [[expectedTags, expectedEvent]],
      };

      expect(result).toMatchObject(expectedResult);
    });

    it('should not register a new user if his email is already registered', () => {
      const result = signUpLogic(() => 'user-1', {
        users: {
          'user-1': {
            userUUID: 'user-1',
            createdOn: 1615299711075000,
            displayName: 'Simone',
            email: 'simone@gmail.com',
          },
        },
        emails: { 'simone@gmail.com': 'user-1' },
      })('Simone', 'simone@gmail.com');

      const expectedResult = {
        status: 'error',
        errorType: 'SignUp_EmailAlreadyExists',
        errorMessage: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });
  });

  describe('editUserProfileLogic', () => {
    it('should not allow an anonymous user to edit a profile', () => {
      const result = editUserProfileLogic(
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
        status: 'error',
        errorType: 'Authetication_UserIsNotSignedIn',
        errorMessage: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });

    it('should not allow a user trying to edit a profile when he is not registered', () => {
      const result = editUserProfileLogic(
        { users: {}, emails: {} },
        'SPO',
        'user-2'
      );

      const expectedResult = {
        status: 'error',
        errorType: 'UserEditProfile_UserIsNotRegistered',
        errorMessage: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });

    it('should not allow a user trying to edit a profile without providing a display name', () => {
      const result = editUserProfileLogic(
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
        status: 'error',
        errorType: 'UserEditProfile_DisplayNameIsRequired',
        errorMessage: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });

    it('should allow editing the user profile', () => {
      const result = editUserProfileLogic(
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
        status: 'ok',
        tagsWithEvents: [[expectedTags, expectedEvent]],
      };

      expect(result).toMatchObject(expectedResult);
    });
  });
});
