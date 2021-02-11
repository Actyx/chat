import React, { FC, useContext } from 'react';
import { Pond } from '@actyx/pond';
import {
  UsersCatalogFishState,
  UserUUID,
} from '../../business-logic/users-catalog-fish/types';
import {
  signUp,
  signIn,
  mkUserUUID,
} from '../../business-logic/users-catalog-fish/logic';
import { SignUp } from './SignUp';
import { SignIn } from './SignIn';
import { DispatchContextUI } from '../ui-state-manager/UIStateManager';
import { addSignedInUser, goToChatScreen } from '../ui-state-manager/actions';

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

  const [errorPond, setErrorPond] = React.useState<string>();

  const handleSignUp = async (displayName: string, email: string) => {
    try {
      const newUserUUID = await signUp(pond, mkUserUUID)(displayName, email);
      setIsSignUpSuccess(newUserUUID ? true : false);
      setUserUUID(newUserUUID);
      setErrorPond(undefined);
    } catch (err) {
      setErrorPond(`Sorry an error occurred, please try later: ${err}`);
    }
  };

  const handleSignIn = (userUUID: UserUUID) => {
    const isUserSignedIn = signIn(userUUID, stateUsersCatalogFish.users);
    setIsSignInSuccess(isUserSignedIn);
    if (isUserSignedIn) {
      dispatch(addSignedInUser(userUUID));
    }
  };

  const handleGoToChatScreen = () => dispatch(goToChatScreen());

  return (
    <div>
      {errorPond}
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
