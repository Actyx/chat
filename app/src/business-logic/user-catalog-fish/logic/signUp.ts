import { mkErrorSignUpEmailAlreadyExists } from '../../common/errors';
import { LogicResult } from '../../common/logic-types';
import { getUserAddedEvent } from '../events';
import {
  Email,
  UserCatalogFishEvent,
  UserCatalogFishState,
  UserUUID,
} from '../types';
import { isUserEmailRegistered } from './helpers';

export const signUp = (makerUUID: () => UserUUID) => (
  fishState: UserCatalogFishState,
  displayName: string,
  email: Email
): LogicResult<UserCatalogFishEvent, UserUUID> => {
  const userUUID = makerUUID();
  return isUserEmailRegistered(email, fishState.emails)
    ? mkErrorSignUpEmailAlreadyExists(email)
    : {
        type: 'ok',
        tagsWithEvents: [getUserAddedEvent(userUUID, displayName, email)],
        result: userUUID,
      };
};
