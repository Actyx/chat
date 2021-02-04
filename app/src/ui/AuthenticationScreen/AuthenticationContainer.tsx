import React, { FC, useContext } from 'react';
import { Pond } from '@actyx/pond';
import {
  UsersCatalogFishState,
  UserUniqueIdentifier,
} from '../../business-logic/users-catalog-fish/types';
import { signUp, signIn } from '../../business-logic/users-catalog-fish/logic';
import { SignUp } from './SignUp';
import { SignIn } from './SignIn';
import { addSignedInUser, goToScreenChat } from '../ui-state-manager/actions';
import { DispatchContextUI } from '../ui-state-manager/UIStateManager';

type Props = Readonly<{
  pond: Pond;
  stateUsersCatalogFish: UsersCatalogFishState;
}>;

export const AuthenticationContainer: FC<Props> = ({
  pond,
  stateUsersCatalogFish: fishState,
}) => {
  const dispatch = useContext(DispatchContextUI);

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
    if (resultLogic.success) {
      dispatch(addSignedInUser(userUniqueIdentifier));
    }
  };

  const handleGoToChatScreen = () => dispatch(goToScreenChat());

  return (
    <div>
      <SignUp
        signUp={handleSignUp}
        isSignUpSuccess={isSignUpSuccess}
        userUniqueIdentifier={userUniqueIdentifier}
      />
      <SignIn
        isSignInSuccess={isSignInSuccess}
        signIn={handleSignIn}
        goToChangeScreen={handleGoToChatScreen}
      />
    </div>
  );
};
