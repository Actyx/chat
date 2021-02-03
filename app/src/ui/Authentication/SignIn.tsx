import React, { FC } from 'react';
import { UserUniqueIdentifier } from '../../business-logic/common-types';

type Props = Readonly<{
  isSignInSuccess?: boolean;
  signIn: (userUniqueIdentifier: UserUniqueIdentifier) => void;
}>;

export const SignIn: FC<Props> = ({ isSignInSuccess, signIn }) => {
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
      </form>
    </div>
  );
};