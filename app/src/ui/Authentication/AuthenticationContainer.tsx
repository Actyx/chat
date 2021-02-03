import React, { FC } from 'react';
import { Pond } from '@actyx/pond';
import { UsersCatalogFishState } from '../../business-logic/users-catalog-fish/types';
import {
  checkUserEmailAndSignup,
  isUserUniqueIdentifierRegistered,
} from '../../business-logic/users-catalog-fish/logic';
import { SignUp } from './SignUp';
import { UserUniqueIdentifier } from '../../business-logic/common-types';

type Props = Readonly<{
  pond: Pond;
  fishState: UsersCatalogFishState;
}>;

export const AuthenticationContainer: FC<Props> = ({ pond, fishState }) => {
  const [isSignUpSuccess, setIsSignupSuccess] = React.useState<
    boolean | undefined
  >(undefined);
  const [userUniqueIdentifier, setUserUniqueIdentifier] = React.useState<
    UserUniqueIdentifier | undefined
  >();

  const handleSignUp = (displayName: string, email: string) => {
    const result = checkUserEmailAndSignup(
      pond,
      displayName,
      email,
      fishState.usersEmails
    );
    if (result.success) {
      setIsSignupSuccess(true);
      setUserUniqueIdentifier(result.userUniqueIdentifier);
    } else {
      setIsSignupSuccess(false);
      setUserUniqueIdentifier(undefined);
    }
  };

  const handleSignIn = () => {
    const canSignIn = isUserUniqueIdentifierRegistered(
      '67debbb6-6e68-4829-ada2-18e234aeba6c',
      fishState?.users
    );
    if (canSignIn) {
      window.alert('user is signed in');
    } else {
      window.alert('sorry cannot sign in');
    }
  };
  return (
    <div>
      <SignUp
        signUp={handleSignUp}
        isSignUpSuccess={isSignUpSuccess}
        userUniqueIdentifier={userUniqueIdentifier}
      />
      <h1>UsersCatalog fish</h1>
      <h2>State</h2>
      <pre>{JSON.stringify(fishState, undefined, 4)}</pre>
      <button onClick={handleSignIn} type="button">
        Sign-in user Simone with user unique identifier
      </button>
    </div>
  );
};
