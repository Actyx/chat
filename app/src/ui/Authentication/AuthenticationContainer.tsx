import React, { FC } from 'react';
import { Pond } from '@actyx/pond';
import {
  UsersCatalogFishState,
  UserUniqueIdentifier,
} from '../../business-logic/users-catalog-fish/types';
import { signUp, signIn } from '../../business-logic/users-catalog-fish/logic';
import { SignUp } from './SignUp';
import { SignIn } from './SignIn';

type Props = Readonly<{
  pond: Pond;
  fishState: UsersCatalogFishState;
}>;

export const AuthenticationContainer: FC<Props> = ({ pond, fishState }) => {
  const [isSignUpSuccess, setIsSignUpSuccess] = React.useState<boolean>();

  const [isSignInSuccess, setIsSignInSuccess] = React.useState<boolean>();

  const [
    userUniqueIdentifier,
    setUserUniqueIdentifier,
  ] = React.useState<UserUniqueIdentifier>();

  const handleSignUp = (displayName: string, email: string) => {
    const resultLogic = signUp(pond, displayName, email, fishState.usersEmails);
    if (resultLogic.success) {
      setIsSignUpSuccess(true);
      setUserUniqueIdentifier(resultLogic.userUniqueIdentifier);
    } else {
      setIsSignUpSuccess(false);
      setUserUniqueIdentifier(undefined);
    }
  };

  const handleSignIn = (userUniqueIdentifier: UserUniqueIdentifier) => {
    const resultLogic = signIn(userUniqueIdentifier, fishState.users);
    setIsSignInSuccess(resultLogic.success);
  };
  return (
    <div>
      <SignUp
        signUp={handleSignUp}
        isSignUpSuccess={isSignUpSuccess}
        userUniqueIdentifier={userUniqueIdentifier}
      />
      <SignIn isSignInSuccess={isSignInSuccess} signIn={handleSignIn} />
    </div>
  );
};
