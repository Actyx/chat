import { signUp } from './signUp';

describe('signUp', () => {
  it('should register a new user if his email is not already registered', () => {
    const result = signUp(() => 'user-1')(
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
    const result = signUp(() => 'user-1')(
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
