import React, { useState } from 'react';
import { UserUUID } from '../../business-logic/user-catalog-fish/types';
import { FormEventElement, InputChangeEvent } from '../utils/ui-event-types';
import { TextField } from '../common/TextField/TextField';
import { Submit } from '../common/Submit/Submit';
import { Alert } from '../common/Alert/Alert';
import { Heading1 } from '../common/Hedings/Heading1';
import { SubHeading } from '../common/SubHeading/SubHeading';
import { Link } from '../common/Link/Link';
import { SparklesIcon } from '../common/Icons/SparklesIcon';
import { ExclamationIcon } from '../common/Icons/ExclamationIcon';

type SignInProps = Readonly<{
  isSignInSuccess?: boolean;
  signIn: (userUUID: UserUUID) => void;
  goToChatScreen: () => void;
}>;

export const SignIn = ({
  isSignInSuccess,
  signIn,
  goToChatScreen,
}: SignInProps) => {
  const [userUUID, setUserUUID] = useState<UserUUID>(
    'b5e1dee8-7db4-463f-b0f1-111824adb0dd'
  );

  const handleChangeUserUUID = (e: InputChangeEvent) =>
    setUserUUID(e.target.value);

  const handleSubmit = (e: FormEventElement) => {
    signIn(userUUID);
    e.preventDefault();
  };

  const handleGoToChangeScreen = () => goToChatScreen();

  return (
    <div className="text-center space-y-3">
      <Heading1>Sign-in</Heading1>
      <SubHeading>Enter your credentials</SubHeading>
      <form onSubmit={handleSubmit}>
        <div className="w-96 space-y-5">
          <TextField
            type="password"
            required
            value={userUUID}
            full
            onChange={handleChangeUserUUID}
          />
          <Submit full>Sign-in</Submit>
        </div>
      </form>
      {isSignInSuccess !== undefined && (
        <Alert
          icon={
            isSignInSuccess ? (
              <SparklesIcon color="green-medium" />
            ) : (
              <ExclamationIcon color="red-medium" />
            )
          }
          variant={isSignInSuccess ? 'success' : 'danger'}
          full
        >
          {isSignInSuccess === true ? (
            <div className="flex space-x-2">
              <div>Sign-in success!</div>
              <Link click={handleGoToChangeScreen}>Click to enter</Link>
            </div>
          ) : (
            'Could not sign-in. The credential is not valid.'
          )}
        </Alert>
      )}
    </div>
  );
};
