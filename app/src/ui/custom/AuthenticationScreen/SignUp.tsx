import { useState, MouseEvent } from 'react';
import { UserUUID } from '../../../business-logic/user-catalog-fish/types';
import { FormEventElement, InputChangeEvent } from '../../utils/ui-event-types';
import { TextField } from '../../common/TextField/TextField';
import { Heading1 } from '../../common/Hedings/Heading1';
import { SubHeading } from '../../common/SubHeading/SubHeading';
import { Button } from '../../common/Button/Button';
import { Alert } from '../../common/Alert/Alert';
import { ButtonTextLink } from '../../common/ButtonTextLink/ButtonTextLink';
import { ExclamationIcon } from '../../common/Icons/ExclamationIcon';

type SignUpProps = Readonly<{
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
}: SignUpProps) => {
  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const handleChangeName = (e: InputChangeEvent) => setName(e.target.value);

  const handleChangeEmail = (e: InputChangeEvent) => setEmail(e.target.value);

  const handleSubmit = (e: FormEventElement) => {
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
          <Button full>Sign-up</Button>
          {isSignUpSuccess !== undefined && (
            <Alert
              icon={!isSignUpSuccess && <ExclamationIcon color="red-medium" />}
              variant={isSignUpSuccess ? 'success' : 'danger'}
            >
              {isSignUpSuccess ? (
                <div className="space-y-2">
                  <div>Your password is (please keep it safe):</div>
                  <div className="font-semibold">{userUUID}</div>
                  <ButtonTextLink click={handleOpenSignIn}>
                    Click here to Sign-in
                  </ButtonTextLink>
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
