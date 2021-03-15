import { useState } from 'react';
import { CreateAccount } from './CreateAccount';
import { ErrorBoundary } from '../../common/ErrorBoundary/ErrorBoundary';
import { SignUpContainer } from './SignUp/SignUpContainer';
import { SignInContainer } from './SignIn/SignInContainer';

export const AuthenticationContainer = () => {
  const [showSignUp, setShowSignUp] = useState<boolean>(false);

  const handleShowSignUp = () => setShowSignUp(true);

  const handleShowSignIn = () => setShowSignUp(false);

  return (
    <div className="mt-24 flex flex-col w-screen items-center">
      {showSignUp ? (
        <ErrorBoundary>
          <SignUpContainer showSignIn={handleShowSignIn} />
        </ErrorBoundary>
      ) : (
        <ErrorBoundary>
          <CreateAccount createAccount={handleShowSignUp} />
          <SignInContainer />
        </ErrorBoundary>
      )}
    </div>
  );
};
