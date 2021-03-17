import { ErrorCode } from '../../common/logic-types';
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
    ? {
        type: 'error',
        code: ErrorCode.SignUpEmailAlreadyExists,
        message: `New user cannot sign up, email provided (${email}) is already registered in the system`,
      }
    : {
        type: 'ok',
        tagsWithEvents: [getUserAddedEvent(userUUID, displayName, email)],
        result: userUUID,
      };
};
