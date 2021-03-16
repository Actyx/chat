import {
  mkErrorAutheticationUserIsNotSignIn,
  mkErrorDoesChannelNameExist,
} from '../../common/errors';
import { ErrorCode } from '../../common/logic-types';
import { ChannelId } from '../../message/types';
import { isSignedInUser } from '../../user-catalog-fish/logic/helpers';
import { UserUUID } from '../../user-catalog-fish/types';
import { getChannelProfileEdited } from '../events';
import { doesChannelNameExist, prepareContentChannelProfile } from '../logic';
import { getChannelProfileByChannelId } from '../logic-helpers';
import { ChannelCatalogFishState, EditChannelLogicResult } from '../types';

export const editChannel = (
  fishState: ChannelCatalogFishState,
  userUUID: UserUUID,
  channelId: ChannelId,
  name: string,
  description: string
): EditChannelLogicResult => {
  if (!isSignedInUser(userUUID)) {
    return mkErrorAutheticationUserIsNotSignIn();
  }
  const { newName, newDescription } = prepareContentChannelProfile(
    name,
    description
  );

  const profile = getChannelProfileByChannelId(channelId, fishState.channels);
  if (!profile) {
    return {
      type: 'error',
      code: ErrorCode.ChannelEditChannelProfileDoesNotExist,
      message: `Cannot edit channel (${channelId}) because channel profile is not registered in the system`,
    };
  }

  const isEditName = profile.name !== newName;
  const isEditDescription = profile.description !== newDescription;
  const isEditWithUniqueNameOnly =
    isEditName &&
    !isEditDescription &&
    !doesChannelNameExist(newName, fishState);
  const isEditWithDescriptionOnly = !isEditName && isEditDescription;

  const canEdit = isEditWithUniqueNameOnly || isEditWithDescriptionOnly;
  if (!canEdit) {
    return mkErrorDoesChannelNameExist(newName);
  }

  return {
    type: 'ok',
    tagsWithEvents: [
      getChannelProfileEdited(channelId, userUUID, newName, newDescription),
    ],
    result: undefined,
  };
};
