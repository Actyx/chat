import { isStringEmpty, prepareString } from '../../../common/strings';
import {
  mkErrorAutheticationUserIsNotSignIn,
  mkErrorUserEditProfileUserIsNotRegistered,
} from '../../common/errors';
import { ErrorCode, LogicResult } from '../../common/logic-types';
import { getUserProfileEditedEvent } from '../events';
import { isUserUUIDRegistered } from './helpers';
import { UserCatalogFishEvent, UserCatalogFishState, UserUUID } from '../types';
import { isSignedInUser } from './helpers';

export const editUserProfile = (
  fishState: UserCatalogFishState,
  displayName: string,
  userUUID: UserUUID
): LogicResult<UserCatalogFishEvent> => {
  if (!isSignedInUser(userUUID)) {
    return mkErrorAutheticationUserIsNotSignIn();
  }

  if (!isUserUUIDRegistered(userUUID, fishState.users)) {
    return mkErrorUserEditProfileUserIsNotRegistered(userUUID);
  }

  const newDisplayName = prepareString(displayName);
  const hasDisplayName = !isStringEmpty(newDisplayName);

  if (!hasDisplayName) {
    return {
      type: 'error',
      code: ErrorCode.UserEditProfileDisplayNameIsRequired,
      message: 'The displayName is required',
    };
  }

  return {
    type: 'ok',
    tagsWithEvents: [getUserProfileEditedEvent(userUUID, displayName)],
    result: undefined,
  };
};
