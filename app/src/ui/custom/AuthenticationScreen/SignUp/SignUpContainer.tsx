import { usePond } from '@actyx-contrib/react-pond';
import React, { useState } from 'react';
import { mkUUID } from '../../../../business-logic/common/util';
import {
  Email,
  UserUUID,
} from '../../../../business-logic/user-catalog-fish/types';
import { getUIMessage } from '../../../../l10n/l10n';
import { SignUp } from './SignUp';
import { wire } from '../../../../business-logic/common/logic-wire';
import { UserCatalogFish } from '../../../../business-logic/user-catalog-fish/user-catalog-fish';
import { signUp } from '../../../../business-logic/user-catalog-fish/logic/signUp';

type SignUpContainerProps = Readonly<{
  showSignIn: () => void;
}>;

export const SignUpContainer = ({ showSignIn }: SignUpContainerProps) => {
  const pond = usePond();

  const [isSignUpSuccess, setIsSignUpSuccess] = useState<boolean>();

  const [newUserUUID, setNewUserUUID] = useState<UserUUID>();

  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const [invalidMessage, setInvalidMessage] = useState<string>();

  const performSignUp = wire(pond, UserCatalogFish)(signUp(mkUUID));

  const handleSignUp = (name: string, email: Email) =>
    performSignUp(name, email)
      .then((result) => {
        if (result.type === 'ok') {
          setIsSignUpSuccess(true);
          setNewUserUUID(result.result);
        } else {
          setIsSignUpSuccess(false);
          setInvalidMessage(getUIMessage(result.code));
        }
      })
      .catch(setPondErrorMessage);

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
