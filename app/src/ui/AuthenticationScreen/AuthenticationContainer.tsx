import React, { FC, useContext, useEffect } from 'react';
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
import {
  initialStateUserCatalogFish,
  UsersCatalogFish,
} from '../../business-logic/users-catalog-fish/users-catalog-fish';

type Props = Readonly<{
  pond: Pond;
}>;

export const AuthenticationContainer: FC<Props> = ({ pond }) => {
  const dispatch = useContext(DispatchContextUI);

  const [
    stateUsersCatalogFish,
    setStateUsersCatalogFish,
  ] = React.useState<UsersCatalogFishState>(initialStateUserCatalogFish);

  useEffect(() => {
    const cancelSubscription = pond.observe(
      UsersCatalogFish.fish,
      setStateUsersCatalogFish
    );
    return () => cancelSubscription();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
