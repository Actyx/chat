import { isStringEmpty, prepareString } from '../../../common/strings';
import { mkErrorAutheticationUserIsNotSignIn } from '../../common/errors';
import { ErrorCode, LogicResult } from '../../common/logic-types';
import { getUserProfileEditedEvent } from '../events';
import { isSignedInUser2 } from './helpers';
import { UserCatalogFishEvent, UserCatalogFishState, UserUUID } from '../types';

export const editUserProfile = (
  fishState: UserCatalogFishState,
  displayName: string,
  userUUID: UserUUID
): LogicResult<UserCatalogFishEvent> => {
  if (!isSignedInUser2(userUUID, fishState.users)) {
    return mkErrorAutheticationUserIsNotSignIn();
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
