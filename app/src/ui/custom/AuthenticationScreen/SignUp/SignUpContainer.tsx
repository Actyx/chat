import { usePond } from '@actyx-contrib/react-pond';
import React, { useState } from 'react';
import { mkUUID } from '../../../../business-logic/common/util';
import {
  Email,
  UserCatalogFishEvent,
  UserCatalogFishState,
  UserUUID,
} from '../../../../business-logic/user-catalog-fish/types';
import { getUIMessage } from '../../../../l10n/l10n';
import { SignUp } from './SignUp';
import { wire } from '../../../../business-logic/common/logic-helpers';
import { signUpLogic } from '../../../../business-logic/user-catalog-fish/logic';
import { UserCatalogFish } from '../../../../business-logic/user-catalog-fish/user-catalog-fish';

type SignUpContainerProps = Readonly<{
  showSignIn: () => void;
}>;

export const SignUpContainer = ({ showSignIn }: SignUpContainerProps) => {
  const pond = usePond();

  const wireBl = wire<UserCatalogFishState, UserCatalogFishEvent, UserUUID>(
    pond
  )(UserCatalogFish);

  const [isSignUpSuccess, setIsSignUpSuccess] = useState<boolean>();

  const [newUserUUID, setNewUserUUID] = useState<UserUUID>();

  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const [invalidMessage, setInvalidMessage] = useState<string>();

  const handleSignUp = async (name: string, email: Email) => {
    try {
      const resultLogic = await wireBl(signUpLogic(mkUUID)(name, email))();
      if (resultLogic.type === 'ok') {
        setIsSignUpSuccess(true);
        setNewUserUUID(resultLogic.result);
      } else {
        setIsSignUpSuccess(false);
        setInvalidMessage(getUIMessage(resultLogic.code));
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
