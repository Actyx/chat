import { useState } from 'react';
import { UserUUID } from '../../business-logic/user-catalog-fish/types';
import { FormEvent, InputChangeEvent } from '../../common/ui-types';
import { TextField } from '../common/Form/TextField/TextField';
import { Submit } from '../common/Form/Submit/Submit';

import { Heading1 } from '../common/Hedings/Heading1';
import { SubHeading } from '../common/SubHeading/SubHeading';

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
    <div>
      <Heading1>Sign-in</Heading1>
      <SubHeading>Enter your credentials</SubHeading>
      <form onSubmit={handleSubmit}>
        <div className="w-96">
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
      {isSignInSuccess === undefined
        ? ''
        : isSignInSuccess === true
        ? 'Sign-in success'
        : 'Sign-in error: could not sign-in, credential not valid'}
      {isSignInSuccess && (
        <button onClick={handleGoToChangeScreen}>Go to chat</button>
      )}
    </div>
  );
};
