import React, { useState } from 'react';
import { UserUUID } from '../../business-logic/user-catalog-fish/types';
import { FormEvent, InputChangeEvent } from '../../common/ui-types';
import { TextField } from '../common/Form/TextField/TextField';
import { Submit } from '../common/Form/Submit/Submit';
import { Alert } from '../common/Alert/Alert';
import { Heading1 } from '../common/Hedings/Heading1';
import { SubHeading } from '../common/SubHeading/SubHeading';
import { Button } from '../common/Button/Button';

type Props = Readonly<{
  isSignInSuccess?: boolean;
  signIn: (userUUID: UserUUID) => void;
  goToChatScreen: () => void;
}>;

export const SignIn = ({ isSignInSuccess, signIn, goToChatScreen }: Props) => {
  const [userUUID, setUserUUID] = useState<UserUUID>('');

  const handleChangeUserUUID = (e: InputChangeEvent) =>
    setUserUUID(e.target.value);

  const handleSubmit = (e: FormEvent) => {
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
        <Alert variant={isSignInSuccess ? 'success' : 'danger'} full>
          {isSignInSuccess === true ? (
            <div>
              <div>Sign-in success!</div>
              <Button click={handleGoToChangeScreen}>Click to enter</Button>
            </div>
          ) : (
            'Could not sign-in. The credential is not valid.'
          )}
        </Alert>
      )}
    </div>
  );
};
