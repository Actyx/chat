import React, { useState, MouseEvent } from 'react';
import { SignUpLogicResult } from '../../../business-logic/user-catalog-fish/types';
import { FormEventElement, InputChangeEvent } from '../../utils/element-events';
import { TextField } from '../../common/TextField/TextField';
import { Heading1 } from '../../common/Hedings/Heading1';
import { SubHeading } from '../../common/SubHeading/SubHeading';
import { Button } from '../../common/Button/Button';
import { Alert } from '../../common/Alert/Alert';
import { ButtonTextLink } from '../../common/ButtonTextLink/ButtonTextLink';
import { ExclamationIcon } from '../../common/Icons/ExclamationIcon';
import { messages } from '../../../l10n/messages';
import { Language } from '../../../l10n/types';
import { getMessage } from '../../../l10n/l10n';

type EmailsUserUUIDsUI = Record<string, string>;

type SignUpProps = Readonly<{
  signUp: (displayName: string, email: string) => Promise<SignUpLogicResult>;
  showSignIn: () => void;
  emailsUserUUIDs: EmailsUserUUIDsUI;
}>;

const getUIMessage = getMessage(messages)(Language.En);

const getToken = (
  emailsUserUUIDs: EmailsUserUUIDsUI,
  email: string,
  isSignUpSuccess?: boolean
): string | undefined => (isSignUpSuccess ? emailsUserUUIDs[email] : undefined);

export const SignUp = ({
  signUp,
  showSignIn,
  emailsUserUUIDs,
}: SignUpProps) => {
  const [isSignUpSuccess, setIsSignUpSuccess] = useState<boolean>();

  const [invalidMessage, setInvalidMessage] = useState<string>();

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
      if (result.type === 'ok') {
        setIsSignUpSuccess(true);
      } else {
        setIsSignUpSuccess(false);
        setInvalidMessage(getUIMessage(result.code));
      }
    } catch (err) {
      setPondErrorMessage(err);
    }
  };

  const handleOpenSignIn = (e: MouseEvent<HTMLButtonElement>) => showSignIn();

  const token = getToken(emailsUserUUIDs, email, isSignUpSuccess);

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
                  <div className="font-semibold">{token}</div>
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
