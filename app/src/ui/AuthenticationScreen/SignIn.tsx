import { FC, useState } from 'react';
import { UserUUID } from '../../business-logic/user-catalog-fish/types';
import { FormEvent, InputChangeEvent } from '../../common/ui-types';

type Props = Readonly<{
  isSignInSuccess?: boolean;
  signIn: (userUUID: UserUUID) => void;
  goToChatScreen: () => void;
}>;

export const SignIn: FC<Props> = ({
  isSignInSuccess,
  signIn,
  goToChatScreen,
}) => {
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
      <h2>Sign-in</h2>
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
