import React, { FC } from 'react';
import { Pond } from '@actyx/pond';
import { UsersCatalogFishState } from '../../business-logic/users-catalog-fish/types';
import {
  checkUserEmailAndSignup,
  isUserEmailRegistered,
  isUserUniqueIdentifierRegistered,
} from '../../business-logic/users-catalog-fish/logic';

const TEST_EMAIL = 'simone@actyx.io';

type Props = Readonly<{
  pond: Pond;
  fishState: UsersCatalogFishState;
}>;

export const AuthenticationContainer: FC<Props> = ({ pond, fishState }) => {
  const handleSignUp = () => {
    if (pond && fishState) {
      if (isUserEmailRegistered(TEST_EMAIL, fishState.usersEmails)) {
        window.alert('sorry eamil for this user has been already registered');
      } else {
        checkUserEmailAndSignup(
          pond,
          'simone',
          'simone@actyx.io',
          fishState.usersEmails
        );
      }
    }
  };

  const handleSignIn = () => {
    if (fishState) {
      const canSignIn = isUserUniqueIdentifierRegistered(
        '67debbb6-6e68-4829-ada2-18e234aeba6c',
        fishState?.users
      );
      if (canSignIn) {
        window.alert('user is signed in');
      } else {
        window.alert('sorry cannot sign in');
      }
    }
  };
  return (
    <div>
      <h1>UsersCatalog fish</h1>
      <h2>State</h2>
      <pre>{JSON.stringify(fishState, undefined, 4)}</pre>
      <button onClick={handleSignUp} type="button">
        Sing-up user simone@actyx.io
      </button>
      <button onClick={handleSignIn} type="button">
        Sign-in user Simone with user unique identifier
      </button>
    </div>
  );
};
