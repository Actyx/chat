import {
  mkErrorAutheticationUserIsNotSignIn,
  mkErrorChannelDoesNotExist,
  mkErrorDoesChannelNameExist,
} from '../../common/errors';
import { LogicResult } from '../../common/logic-types';
import { ChannelId } from '../../message/types';
import { isSignedInUser } from '../../user-catalog-fish/logic/helpers';
import { UserUUID } from '../../user-catalog-fish/types';
import { getChannelProfileEdited } from '../events';
import {
  doesChannelNameExist,
  getChannelProfileByChannelId,
  prepareContentChannelProfile,
} from '../logic-helpers';
import { ChannelCatalogFishState, ChannelProfileEditedEvent } from '../types';

export const editChannel = (
  fishState: ChannelCatalogFishState,
  userUUID: UserUUID,
  channelId: ChannelId,
  name: string,
  description: string
): LogicResult<ChannelProfileEditedEvent> => {
  if (!isSignedInUser(userUUID)) {
    return mkErrorAutheticationUserIsNotSignIn();
  }
  const { newName, newDescription } = prepareContentChannelProfile(
    name,
    description
  );

  const profile = getChannelProfileByChannelId(channelId, fishState.channels);
  if (!profile) {
    return mkErrorChannelDoesNotExist(channelId);
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
