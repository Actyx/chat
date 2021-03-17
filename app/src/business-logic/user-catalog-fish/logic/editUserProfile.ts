import { isStringEmpty, prepareString } from '../../../common/strings';
import { logBugBl } from '../../../logger/logger';
import { mkErrorAutheticationUserIsNotSignIn } from '../../common/errors';
import { ErrorCode } from '../../common/logic-types';
import { getUserProfileEditedEvent } from '../events';
import { isUserUUIDRegistered } from './helpers';
import {
  EditUserProfileResult,
  UserCatalogFishState,
  UserUUID,
} from '../types';
import { isSignedInUser } from './helpers';

export const editUserProfile = (
  fishState: UserCatalogFishState,
  displayName: string,
  userUUID: UserUUID
): EditUserProfileResult => {
  if (!isSignedInUser(userUUID)) {
    return mkErrorAutheticationUserIsNotSignIn();
  }

  if (!isUserUUIDRegistered(userUUID, fishState.users)) {
    const code = ErrorCode.UserEditProfileUserIsNotRegistered;
    logBugBl(code);
    return {
      type: 'error',
      code,
      message: `UserUUID provided (${userUUID}) is not registered in the system`,
    };
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