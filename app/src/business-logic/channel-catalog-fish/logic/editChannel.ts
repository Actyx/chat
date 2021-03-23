import {
  mkErrorAutheticationUserIsNotSignIn,
  mkErrorChannelDoesNotExist,
  mkErrorDoesChannelNameExist,
} from '../../common/errors';
import { LogicResult } from '../../common/logic-types';
import { ChannelId } from '../../message/types';
import { isSignedInUser } from '../../user-catalog-fish/logic/helpers';
import { Users, UserUUID } from '../../user-catalog-fish/types';
import { getChannelProfileEdited } from '../events';
import {
  doesChannelNameExist,
  getChannelProfileByChannelId,
  prepareContentChannelProfile,
} from '../logic-helpers';
import { ChannelCatalogFishState, ChannelProfileEditedEvent } from '../types';

export const editChannel = (
  fishState: ChannelCatalogFishState,
  users: Users,
  userUUID: UserUUID,
  channelId: ChannelId,
  name: string,
  description: string
): LogicResult<ChannelProfileEditedEvent> => {
  if (!isSignedInUser(userUUID, users)) {
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
  const isEditNameNotUnique = doesChannelNameExist(newName, fishState);

  if (isEditName && isEditNameNotUnique) {
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
