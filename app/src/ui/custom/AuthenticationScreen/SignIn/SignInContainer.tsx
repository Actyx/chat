import { usePond } from '@actyx-contrib/react-pond';
import React, { useContext, useState } from 'react';
import { signIn } from '../../../../business-logic/user-catalog-fish/logic/helpers';
import { UserUUID } from '../../../../business-logic/user-catalog-fish/types';
import { UserCatalogFish } from '../../../../business-logic/user-catalog-fish/user-catalog-fish';
import {
  addSignedInUser,
  goToChatScreen,
} from '../../../state-manager/actions';
import { DispatchContextUI } from '../../../state-manager/UIStateManager';
import { useFish } from '../../../utils/use-fish';
import { SignIn } from './SignIn';

export const SignInContainer = () => {
  const dispatch = useContext(DispatchContextUI);

  const pond = usePond();

  const stateUserCatalogFish = useFish(
    pond,
    UserCatalogFish,
    UserCatalogFish.initialState
  );

  const [isSignInSuccess, setIsSignInSuccess] = useState<boolean>();

  const handleGoToChatScreen = () => dispatch(goToChatScreen());

  const handleSignIn = (userUUID: UserUUID) => {
    const isUserSignedIn = signIn(userUUID, stateUserCatalogFish.users);
    setIsSignInSuccess(isUserSignedIn);
    if (isUserSignedIn) {
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
