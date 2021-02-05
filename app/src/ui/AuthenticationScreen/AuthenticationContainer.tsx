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

  const handleSignUp = async (displayName: string, email: string) => {
    const newUserUUID = await signUp(
      pond,
      displayName,
      email,
      stateUsersCatalogFish.emails
    );
    setIsSignUpSuccess(newUserUUID ? true : false);
    setUserUUID(newUserUUID);
  };

  const handleSignIn = (userUUID: UserUUID) => {
    const isUserSignedIn = signIn(userUUID, stateUsersCatalogFish.users);
    setIsSignInSuccess(isUserSignedIn);
    if (isUserSignedIn) {
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
        goToChatScreen={handleGoToChatScreen}
      />
    </div>
  );
};
