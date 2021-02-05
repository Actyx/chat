import React, { FC, useContext } from 'react';
import { Pond } from '@actyx/pond';
import {
  UsersCatalogFishState,
  UserUUID,
} from '../../business-logic/users-catalog-fish/types';
import { signUp, signIn } from '../../business-logic/users-catalog-fish/logic';
import { SignUp } from './SignUp';
import { SignIn } from './SignIn';
import { DispatchContextUI } from '../ui-state-manager/UIStateManager';
import { addSignedInUser, goToScreenChat } from '../ui-state-manager/actions';

type Props = Readonly<{
  pond: Pond;
  stateUsersCatalogFish: UsersCatalogFishState;
}>;

export const AuthenticationContainer: FC<Props> = ({
  pond,
  stateUsersCatalogFish,
}) => {
  const dispatch = useContext(DispatchContextUI);

  const [isSignUpSuccess, setIsSignUpSuccess] = React.useState<boolean>();

  const [isSignInSuccess, setIsSignInSuccess] = React.useState<boolean>();

  const [userUUID, setUserUUID] = React.useState<UserUUID>();

  const handleSignUp = (displayName: string, email: string) => {
    const resultLogic = signUp(
      pond,
      displayName,
      email,
      stateUsersCatalogFish.emails
    );
    if (resultLogic.success) {
      setIsSignUpSuccess(true);
      setUserUUID(resultLogic.userUUID);
    } else {
      setIsSignUpSuccess(false);
      setUserUUID(undefined);
    }
  };

  const handleSignIn = (userUUID: UserUUID) => {
    const resultLogic = signIn(userUUID, stateUsersCatalogFish.users);
    setIsSignInSuccess(resultLogic);
    if (resultLogic) {
      dispatch(addSignedInUser(userUUID));
    }
  };

  const handleGoToChatScreen = () => dispatch(goToScreenChat());

  return (
    <div>
      <SignUp
        signUp={handleSignUp}
        isSignUpSuccess={isSignUpSuccess}
        userUUID={userUUID}
      />
      <SignIn
        isSignInSuccess={isSignInSuccess}
        signIn={handleSignIn}
        goToChangeScreen={handleGoToChatScreen}
      />
    </div>
  );
};
