import { usePond } from '@actyx-contrib/react-pond';
import React, { useContext, useState } from 'react';
import { signIn } from '../../../../business-logic/user-catalog-fish/logic/helpers';
import { UserUUID } from '../../../../business-logic/user-catalog-fish/types';
import { UserCatalogFish } from '../../../../business-logic/user-catalog-fish/user-catalog-fish';
import {
  addSignedInUser,
  goToChatScreen,
} from '../../../state-manager/actions';
import { DispatchContextUI } from '../../../state-manager/dispatch';
import { useFish } from '../../../utils/use-fish';
import { SignIn } from './SignIn';

export const SignInContainer = () => {
  const dispatch = useContext(DispatchContextUI);

  const pond = usePond();

  const [userUUID, setUserUUID] = useState<UserUUID>();

  const userCatalogFishState = useFish(
    pond,
    UserCatalogFish,
    UserCatalogFish.initialState
  );

  const [isSignInSuccess, setIsSignInSuccess] = useState<boolean>();

  const handleGoToChatScreen = () => {
    userUUID && dispatch(goToChatScreen(userUUID));
  };

  const handleSignIn = (userUUID: UserUUID) => {
    const isUserSignedIn = signIn(userUUID, userCatalogFishState.users);
    setIsSignInSuccess(isUserSignedIn);
    if (isUserSignedIn) {
      setUserUUID(userUUID);
      dispatch(addSignedInUser(userUUID));
    }
  };

  return (
    <SignIn
      isSignInSuccess={isSignInSuccess}
      signIn={handleSignIn}
      goToChatScreen={handleGoToChatScreen}
    />
  );
};
