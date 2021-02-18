import React, { FC } from 'react';
import { UserUUID } from '../../business-logic/users-catalog-fish/types';
import { FormEvent, InputChangeEvent } from '../../common/ui-types';

type Props = Readonly<{
  isSignUpSuccess?: boolean;
  userUUID?: UserUUID;
  signUp: (displayName: string, email: string) => void;
}>;

export const SignUp: FC<Props> = ({ isSignUpSuccess, userUUID, signUp }) => {
  const [name, setName] = React.useState('');

  const [email, setEmail] = React.useState('');

  const handleChangeName = (e: InputChangeEvent) => setName(e.target.value);

  const handleChangeEmail = (e: InputChangeEvent) => setEmail(e.target.value);

  const handleSubmit = (e: FormEvent) => {
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
          ? `Sign-up success: your password is: ${userUUID}`
          : 'Sign-up error: email is already registered'}
      </form>
    </div>
  );
};
