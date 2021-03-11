import React, { useState, MouseEvent } from 'react';
import { UserUUID } from '../../../business-logic/user-catalog-fish/types';
import { FormEventElement, InputChangeEvent } from '../../utils/element-events';
import { TextField } from '../../common/TextField/TextField';
import { Heading1 } from '../../common/Hedings/Heading1';
import { SubHeading } from '../../common/SubHeading/SubHeading';
import { Button } from '../../common/Button/Button';
import { Alert } from '../../common/Alert/Alert';
import { ButtonTextLink } from '../../common/ButtonTextLink/ButtonTextLink';
import { ExclamationIcon } from '../../common/Icons/ExclamationIcon';
import { SignUpResult } from '../../../business-logic/common/types';

type SignUpProps = Readonly<{
  signUp: (displayName: string, email: string) => Promise<SignUpResult>;
  showSignIn: () => void;
}>;

export const SignUp = ({ signUp, showSignIn }: SignUpProps) => {
  const [isSignUpSuccess, setIsSignUpSuccess] = useState<boolean>();

  const [userUUID, setUserUUID] = useState<UserUUID>();

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const handleChangeName = (e: InputChangeEvent) => setName(e.target.value);

  const handleChangeEmail = (e: InputChangeEvent) => setEmail(e.target.value);

  const handleSubmit = async (e: FormEventElement) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const result = await signUp(name, email);
      if (result.status === 'ok') {
        setIsSignUpSuccess(result.others?.userUUID ? true : false);
        setUserUUID(result.others?.userUUID);
      } else {
        setIsSignUpSuccess(false);
      }
    } catch (err) {
      setPondErrorMessage(err);
    }
  };
  // const handleSubmit = async (e: FormEventElement) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   try {
  //     const newUserUUID = await signUp(name, email);
  //     setIsSignUpSuccess(newUserUUID ? true : false);
  //     setUserUUID(newUserUUID);
  //   } catch (err) {
  //     setPondErrorMessage(err);
  //   }
  // };

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
          {pondErrorMessage && (
            <Alert variant="danger">{pondErrorMessage}</Alert>
          )}
        </div>
      </form>
    </div>
  );
};
