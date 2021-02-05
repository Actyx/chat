import React, { FC } from 'react';
import { UserUniqueIdentifier } from '../../business-logic/users-catalog-fish/types';

type Props = Readonly<{
  isSignUpSuccess?: boolean;
  userUniqueIdentifier?: UserUniqueIdentifier;
  signUp: (displayName: string, email: string) => void;
}>;

export const SignUp: FC<Props> = ({
  isSignUpSuccess,
  userUniqueIdentifier,
  signUp,
}) => {
  const [name, setName] = React.useState('');

  const [email, setEmail] = React.useState('');

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    signUp(name, email);
    e.preventDefault();
  };

  return (
    <div>
      <h2>Sign-up</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" required value={name} onChange={handleChangeName} />
        <br />
        <label>Email:</label>
        <input
          type="email"
          required
          value={email}
          onChange={handleChangeEmail}
        />
        <br />
        <input type="submit" value="Sign-up" />
        <br />
        {isSignUpSuccess === undefined
          ? ''
          : isSignUpSuccess === true
          ? `Sign-up success: your password is: ${userUniqueIdentifier}`
          : 'Sign-up error: email is already registered'}
      </form>
    </div>
  );
};
