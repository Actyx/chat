import { signUpLogic } from './logic';

describe('UserCatalogFish', () => {
  describe('signUpLogic', () => {
    it('should add a new user to the system', () => {
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
        others: { userUUID: 'user-1' },
      };

      expect(result).toMatchObject(expectedResult);
    });

    // it('should should not add a new user to the system and return and error instead', () => {
    //   const result = signUpLogic(() => 'user-1', {
    //     users: {
    //       'user-1': {
    //         userUUID: 'user-1',
    //         createdOn: 1615299711075000,
    //         displayName: 'Simone',
    //         email: 'simone@gmail.com',
    //       },
    //     },
    //     emails: {
    //       'simon@gmail.com': null,
    //     },
    //   })('Simon', 'simone@gmail.com');

    //   const expectedResult = {
    //     status: 'error',
    //     errorType: 'SignUp_EmailAlreadyExists',
    //     errorMessage: '',
    //   };
    // });
  });
});
