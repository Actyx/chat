import React, { useState, MouseEvent } from 'react';
import {
  FormEventElement,
  InputChangeEvent,
} from '../../../utils/element-events';
import { TextField } from '../../../common/TextField/TextField';
import { Heading1 } from '../../../common/Hedings/Heading1';
import { SubHeading } from '../../../common/SubHeading/SubHeading';
import { Button } from '../../../common/Button/Button';
import { Alert } from '../../../common/Alert/Alert';
import { ButtonTextLink } from '../../../common/ButtonTextLink/ButtonTextLink';
import { ExclamationIcon } from '../../../common/Icons/ExclamationIcon';

type SignUpProps = Readonly<{
  isSignUpSuccess?: boolean;
  invalidMessage?: string;
  newUserUUID?: string;
  pondErrorMessage?: string;
  signUp: (displayName: string, email: string) => void;
  showSignIn: () => void;
}>;

export const SignUp = ({
  isSignUpSuccess,
  invalidMessage,
  newUserUUID,
  pondErrorMessage,
  signUp,
  showSignIn,
}: SignUpProps) => {
  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const handleChangeName = (e: InputChangeEvent) => setName(e.target.value);

  const handleChangeEmail = (e: InputChangeEvent) => setEmail(e.target.value);

  const handleSubmit = async (e: FormEventElement) => {
    e.preventDefault();
    e.stopPropagation();
    signUp(name, email);
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
            change={handleChangeName}
          />
          <TextField
            type="email"
            required
            placeholder="name@work-email.com"
            value={email}
            full
            change={handleChangeEmail}
          />
          <Button full>Sign-up</Button>
          {isSignUpSuccess !== undefined && (
            <Alert
              icon={!isSignUpSuccess && <ExclamationIcon color="red-medium" />}
              variant={isSignUpSuccess ? 'success' : 'warning'}
            >
              {isSignUpSuccess ? (
                <div className="space-y-2">
                  <div>Your authetication token is (keep it safe):</div>
                  <div className="font-semibold">{newUserUUID}</div>
                  <ButtonTextLink click={handleOpenSignIn}>
                    Click here to Sign-in
                  </ButtonTextLink>
                </div>
              ) : (
                invalidMessage
              )}
            </Alert>
          )}
          {pondErrorMessage && (
            <Alert variant="danger">{pondErrorMessage}</Alert>
          )}
        </div>
      </form>
    </div>
  );
};
