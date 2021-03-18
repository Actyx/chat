import { mkErrorSignUpEmailAlreadyExists } from '../../common/errors';
import { getUserAddedEvent } from '../events';
import { Email, UserCatalogFishState, UserUUID } from '../types';
import { isUserEmailRegistered } from './helpers';
import { SignUpLogicResult } from './logic-types';

export const signUp = (makerUUID: () => UserUUID) => (
  fishState: UserCatalogFishState,
  displayName: string,
  email: Email
): SignUpLogicResult => {
  const userUUID = makerUUID();
  return isUserEmailRegistered(email, fishState.emails)
    ? mkErrorSignUpEmailAlreadyExists(email)
    : {
        type: 'ok',
        tagsWithEvents: [getUserAddedEvent(userUUID, displayName, email)],
        result: userUUID,
      };
};
