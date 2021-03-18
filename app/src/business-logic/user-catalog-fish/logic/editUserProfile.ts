import { isStringEmpty, prepareString } from '../../../common/strings';
import {
  mkErrorAutheticationUserIsNotSignIn,
  mkErrorUserEditProfileUserIsNotRegistered,
} from '../../common/errors';
import { ErrorCode } from '../../common/logic-types';
import { getUserProfileEditedEvent } from '../events';
import { isUserUUIDRegistered } from './helpers';
import { UserCatalogFishState, UserUUID } from '../types';
import { isSignedInUser } from './helpers';
import { EditUserProfileResult } from './logic-types';

export const editUserProfile = (
  fishState: UserCatalogFishState,
  displayName: string,
  userUUID: UserUUID
): EditUserProfileResult => {
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
