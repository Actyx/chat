import { signUpLogic } from './logic';

describe('UserCatalogFish', () => {
  describe('signUpLogic', () => {
    it('should register a new user if his email is not already registered', () => {
      const result = signUpLogic(() => 'user-1', {
        users: {},
        emails: [],
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
        emails: [{ email: 'simone@gmail.com', userUUID: 'user-1' }],
      })('Simone', 'simone@gmail.com');

      const expectedResult = {
        status: 'error',
        errorType: 'SignUp_EmailAlreadyExists',
        errorMessage: expect.any(String),
      };

      expect(result).toMatchObject(expectedResult);
    });
  });
});
