import { useState } from 'react';
import { UserUUID } from '../../business-logic/user-catalog-fish/types';
import { FormEvent, InputChangeEvent } from '../../common/ui-types';
import { TextField } from '../common/Form/TextField/TextField';
import { Heading1 } from '../common/Hedings/Heading1';
import { SubHeading } from '../common/SubHeading/SubHeading';
import { Submit } from '../common/Form/Submit/Submit';

type Props = Readonly<{
  isSignUpSuccess?: boolean;
  userUUID?: UserUUID;
  signUp: (displayName: string, email: string) => void;
}>;

export const SignUp = ({ isSignUpSuccess, userUUID, signUp }: Props) => {
  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const handleChangeName = (e: InputChangeEvent) => setName(e.target.value);

  const handleChangeEmail = (e: InputChangeEvent) => setEmail(e.target.value);

  const handleSubmit = (e: FormEvent) => {
    signUp(name, email);
    e.preventDefault();
  };

  return (
    <div>
      <Heading1>Sign-up</Heading1>
      <SubHeading>Create an account</SubHeading>
      <form onSubmit={handleSubmit}>
        <div className="w-96">
          <TextField
            required
            placeholder="Name"
            value={name}
            full
            onChange={handleChangeName}
          />
          <TextField
            type="email"
            required
            placeholder="name@work-email.com"
            value={email}
            full
            onChange={handleChangeEmail}
          />
          <Submit full>Sign-up</Submit>
        </div>
      </form>
      {isSignUpSuccess === undefined
        ? ''
        : isSignUpSuccess === true
        ? `Sign-up success: your password is: ${userUUID}`
        : 'Sign-up error: email is already registered'}
    </div>
  );
};
