import React, { FC } from 'react';
import { Pond } from '@actyx/pond';
import { UsersCatalogFishState } from '../../business-logic/users-catalog-fish/types';
import { signUp, signIn } from '../../business-logic/users-catalog-fish/logic';
import { SignUp } from './SignUp';
import { UserUniqueIdentifier } from '../../business-logic/common-types';
import { SignIn } from './SignIn';

type Props = Readonly<{
  pond: Pond;
  fishState: UsersCatalogFishState;
}>;

export const AuthenticationContainer: FC<Props> = ({ pond, fishState }) => {
  const [isSignUpSuccess, setIsSignupSuccess] = React.useState<
    boolean | undefined
  >(undefined);

  const [isSignInSuccess, setIsSignInSuccess] = React.useState<
    boolean | undefined
  >(undefined);

  const [userUniqueIdentifier, setUserUniqueIdentifier] = React.useState<
    UserUniqueIdentifier | undefined
  >('');

  const handleSignUp = (displayName: string, email: string) => {
    const resultLogic = signUp(pond, displayName, email, fishState.usersEmails);
    if (resultLogic.success) {
      setIsSignupSuccess(true);
      setUserUniqueIdentifier(resultLogic.userUniqueIdentifier);
    } else {
      setIsSignupSuccess(false);
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
      <br />
      <h1>UsersCatalog fish</h1>
      <h2>State</h2>
      <pre>{JSON.stringify(fishState, undefined, 4)}</pre>
    </div>
  );
};
