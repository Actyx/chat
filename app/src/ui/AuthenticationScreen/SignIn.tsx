import React, { FC } from 'react';
import { UserUniqueIdentifier } from '../../business-logic/users-catalog-fish/types';

type Props = Readonly<{
  isSignInSuccess?: boolean;
  signIn: (userUniqueIdentifier: UserUniqueIdentifier) => void;
  goToChangeScreen: () => void;
}>;

export const SignIn: FC<Props> = ({
  isSignInSuccess,
  signIn,
  goToChangeScreen,
}) => {
  const [
    userUniqueIdentifier,
    setUserUniqueIdentifier,
  ] = React.useState<UserUniqueIdentifier>('');

  const handleChangeUserUniqueIdentifier = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setUserUniqueIdentifier(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    signIn(userUniqueIdentifier);
    e.preventDefault();
  };

  const handleGoToChangeScreen = () => goToChangeScreen();

  return (
    <div>
      <h2>Sign-in</h2>
      <form onSubmit={handleSubmit}>
        <label>Credential:</label>
        <input
          type="text"
          required
          value={userUniqueIdentifier}
          onChange={handleChangeUserUniqueIdentifier}
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
