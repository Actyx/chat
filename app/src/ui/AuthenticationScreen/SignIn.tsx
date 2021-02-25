import { useState } from 'react';
import { UserUUID } from '../../business-logic/user-catalog-fish/types';
import { FormEvent, InputChangeEvent } from '../../common/ui-types';
import { Heading1 } from '../common/Hedings/Heading1';

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
      <form onSubmit={handleSubmit}>
        <label>Credential:</label>
        <input
          type="text"
          required
          value={userUUID}
          onChange={handleChangeUserUUID}
        />
        <br />
        <input type="submit" value="Sign-in" />
        <br />
        {isSignInSuccess === undefined
          ? ''
          : isSignInSuccess === true
          ? 'Sign-in success'
          : 'Sign-in error: could not sign-in, credential not valid'}
        {isSignInSuccess && (
          <button onClick={handleGoToChangeScreen}>Go to chat</button>
        )}
      </form>
    </div>
  );
};
