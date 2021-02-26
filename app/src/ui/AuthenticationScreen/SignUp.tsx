import { useState, MouseEvent } from 'react';
import { UserUUID } from '../../business-logic/user-catalog-fish/types';
import { FormEvent, InputChangeEvent } from '../../common/ui-types';
import { TextField } from '../common/Form/TextField/TextField';
import { Heading1 } from '../common/Hedings/Heading1';
import { SubHeading } from '../common/SubHeading/SubHeading';
import { Submit } from '../common/Form/Submit/Submit';
import { Alert } from '../common/Alert/Alert';
import { Button } from '../common/Button/Button';

type Props = Readonly<{
  isSignUpSuccess?: boolean;
  userUUID?: UserUUID;
  signUp: (displayName: string, email: string) => void;
  showSignIn: () => void;
}>;

export const SignUp = ({
  isSignUpSuccess,
  userUUID,
  signUp,
  showSignIn,
}: Props) => {
  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const handleChangeName = (e: InputChangeEvent) => setName(e.target.value);

  const handleChangeEmail = (e: InputChangeEvent) => setEmail(e.target.value);

  const handleSubmit = (e: FormEvent) => {
    signUp(name, email);
    e.preventDefault();
  };

  const handleOpenSignIn = (e: MouseEvent<HTMLButtonElement>) => showSignIn();

  return (
    <div className="text-center space-y-3">
      <Heading1>Sign-up</Heading1>
      <SubHeading>Create an account</SubHeading>
      <form onSubmit={handleSubmit}>
        <div className="w-96 space-y-5">
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
          {isSignUpSuccess !== undefined && (
            <Alert variant={isSignUpSuccess ? 'secondary' : 'danger'}>
              {isSignUpSuccess ? (
                <div className="space-y-2">
                  <div>Your password is (please keep it safe):</div>
                  <div className="font-semibold">{userUUID}</div>
                  <Button click={handleOpenSignIn}>
                    Click here to Sign-in
                  </Button>
                </div>
              ) : (
                'Email is already registered'
              )}
            </Alert>
          )}
        </div>
      </form>
    </div>
  );
};
