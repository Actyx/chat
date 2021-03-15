import { usePond } from '@actyx-contrib/react-pond';
import React, { useState } from 'react';
import {
  Email,
  UserUUID,
} from '../../../../business-logic/user-catalog-fish/types';
import { signUpWireForUI } from '../../../../business-logic/user-catalog-fish/wire';
import { getMessage } from '../../../../l10n/l10n';
import { messages } from '../../../../l10n/messages';
import { Language } from '../../../../l10n/types';
import { SignUp } from './SignUp';

const getUIMessage = getMessage(messages)(Language.En);

type SignUpContainerProps = Readonly<{
  showSignIn: () => void;
}>;

export const SignUpContainer = ({ showSignIn }: SignUpContainerProps) => {
  const pond = usePond();

  const [isSignUpSuccess, setIsSignUpSuccess] = useState<boolean>();

  const [newUserUUID, setNewUserUUID] = useState<UserUUID>();

  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const [invalidMessage, setInvalidMessage] = useState<string>();

  const handleSignUp = async (name: string, email: Email) => {
    try {
      const resultLogicUI = await signUpWireForUI(pond)(name, email);
      if (resultLogicUI.type === 'ok') {
        setIsSignUpSuccess(true);
        setNewUserUUID(resultLogicUI.result);
      } else {
        setIsSignUpSuccess(false);
        setInvalidMessage(getUIMessage(resultLogicUI.code));
      }
    } catch (err) {
      setPondErrorMessage(err);
    }
  };

  return (
    <SignUp
      isSignUpSuccess={isSignUpSuccess}
      newUserUUID={newUserUUID}
      invalidMessage={invalidMessage}
      pondErrorMessage={pondErrorMessage}
      signUp={handleSignUp}
      showSignIn={showSignIn}
    />
  );
};
