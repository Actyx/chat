import { usePond } from '@actyx-contrib/react-pond';
import React, { useState } from 'react';
import { mkUUID } from '../../../../business-logic/common/util';
import {
  Email,
  UserUUID,
} from '../../../../business-logic/user-catalog-fish/types';
import { getUIMessage } from '../../../../l10n/l10n';
import { SignUp } from './SignUp';
import { signUpWire } from '../../../../business-logic/user-catalog-fish/wire';

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
      const resultLogicUI = await signUpWire(mkUUID)(pond)(name, email);
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
