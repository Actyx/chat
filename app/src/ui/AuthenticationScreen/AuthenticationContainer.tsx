import { useState, useContext, useEffect } from 'react';
import { Pond } from '@actyx/pond';
import {
  UserCatalogFishState,
  UserUUID,
} from '../../business-logic/user-catalog-fish/types';
import {
  signUp,
  signIn,
  mkUserUUID,
} from '../../business-logic/user-catalog-fish/logic';
import { SignUp } from './SignUp';
import { SignIn } from './SignIn';
import { DispatchContextUI } from '../ui-state-manager/UIStateManager';
import { addSignedInUser, goToChatScreen } from '../ui-state-manager/actions';
import { UserCatalogFish } from '../../business-logic/user-catalog-fish/user-catalog-fish';
import { CreateAccount } from './CreateAccount';

type Props = Readonly<{
  pond: Pond;
}>;

export const AuthenticationContainer = ({ pond }: Props) => {
  const dispatch = useContext(DispatchContextUI);

  const [
    stateUserCatalogFish,
    setStateUserCatalogFish,
  ] = useState<UserCatalogFishState>(UserCatalogFish.fish.initialState);

  useEffect(() => {
    const cancelSubscription = pond.observe(
      UserCatalogFish.fish,
      setStateUserCatalogFish
    );
    return () => cancelSubscription();
  }, [pond]);

  const [isSignUpSuccess, setIsSignUpSuccess] = useState<boolean>();

  const [showSignUp, setShowSignUp] = useState<boolean>(false);

  const [isSignInSuccess, setIsSignInSuccess] = useState<boolean>();

  const [userUUID, setUserUUID] = useState<UserUUID>();

  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const handleSignUp = async (displayName: string, email: string) => {
    try {
      const newUserUUID = await signUp(pond, mkUserUUID)(displayName, email);
      setIsSignUpSuccess(newUserUUID ? true : false);
      setUserUUID(newUserUUID);
      setPondErrorMessage(undefined);
    } catch (err) {
      setPondErrorMessage(`Sorry an error occurred, please try later: ${err}`);
    }
  };

  const handleSignIn = (userUUID: UserUUID) => {
    const isUserSignedIn = signIn(userUUID, stateUserCatalogFish.users);
    setIsSignInSuccess(isUserSignedIn);
    if (isUserSignedIn) {
      dispatch(addSignedInUser(userUUID));
    }
  };

  const handleGoToChatScreen = () => dispatch(goToChatScreen());

  const handleCreateAccount = () => setShowSignUp(true);

  return (
    <div className="mt-24 flex flex-col w-screen items-center">
      {pondErrorMessage}
      {showSignUp ? (
        <SignUp
          signUp={handleSignUp}
          isSignUpSuccess={isSignUpSuccess}
          userUUID={userUUID}
        />
      ) : (
        <>
          <CreateAccount createAccount={handleCreateAccount} />
          <SignIn
            isSignInSuccess={isSignInSuccess}
            signIn={handleSignIn}
            goToChatScreen={handleGoToChatScreen}
          />
        </>
      )}
    </div>
  );
};
