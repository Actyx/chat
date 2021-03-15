import React, { useState, useContext } from 'react';
import { Pond } from '@actyx/pond';
import { UserUUID } from '../../../business-logic/user-catalog-fish/types';
import { signIn } from '../../../business-logic/user-catalog-fish/logic';
import { SignUp } from './SignUp';
import { SignIn } from './SignIn';
import { DispatchContextUI } from '../../state-manager/UIStateManager';
import { addSignedInUser, goToChatScreen } from '../../state-manager/actions';
import { UserCatalogFish } from '../../../business-logic/user-catalog-fish/user-catalog-fish';
import { CreateAccount } from './CreateAccount';
import { ErrorBoundary } from '../../common/ErrorBoundary/ErrorBoundary';
import { useFish } from '../../utils/use-fish';
import { signUpWireForUI } from '../../../business-logic/user-catalog-fish/wire';

type AuthenticationContainerProps = Readonly<{
  pond: Pond;
}>;

export const AuthenticationContainer = ({
  pond,
}: AuthenticationContainerProps) => {
  const dispatch = useContext(DispatchContextUI);

  const stateUserCatalogFish = useFish(
    pond,
    UserCatalogFish,
    UserCatalogFish.initialState
  );

  const [showSignUp, setShowSignUp] = useState<boolean>(false);

  const [isSignInSuccess, setIsSignInSuccess] = useState<boolean>();

  const handleSignUp = signUpWireForUI(pond);

  const handleSignIn = (userUUID: UserUUID) => {
    const isUserSignedIn = signIn(userUUID, stateUserCatalogFish.users);
    setIsSignInSuccess(isUserSignedIn);
    if (isUserSignedIn) {
      dispatch(addSignedInUser(userUUID));
    }
  };

  const handleGoToChatScreen = () => dispatch(goToChatScreen());

  const handleShowSignUp = () => setShowSignUp(true);

  const handleShowSignIn = () => setShowSignUp(false);

  return (
    <div className="mt-24 flex flex-col w-screen items-center">
      {showSignUp ? (
        <ErrorBoundary>
          <SignUp signUp={handleSignUp} showSignIn={handleShowSignIn} />
        </ErrorBoundary>
      ) : (
        <ErrorBoundary>
          <CreateAccount createAccount={handleShowSignUp} />
          <SignIn
            isSignInSuccess={isSignInSuccess}
            signIn={handleSignIn}
            goToChatScreen={handleGoToChatScreen}
          />
        </ErrorBoundary>
      )}
    </div>
  );
};
