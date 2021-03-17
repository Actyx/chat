import {
  mkErrorAutheticationUserIsNotSignIn,
  mkErrorChannelDoesNotExist,
  mkErrorUserIsAssociatedToChannel,
} from '../../common/errors';
import { ChannelId } from '../../message/types';
import { isSignedInUser } from '../../user-catalog-fish/logic/helpers';
import { UserUUID } from '../../user-catalog-fish/types';
import { getChannelAssociatedUser } from '../events';
import {
  isChannelIdRegistered,
  isUserAssociatedToChannel,
} from '../logic-helpers';
import {
  AssociateUserToChannelLogicResult,
  ChannelCatalogFishState,
} from '../types';

export const associateUserToChannelLogic = (
  fishState: ChannelCatalogFishState,
  userUUID: UserUUID,
  channelId: ChannelId
): AssociateUserToChannelLogicResult => {
  if (!isSignedInUser(userUUID)) {
    return mkErrorAutheticationUserIsNotSignIn();
  }

  if (!isChannelIdRegistered(channelId, fishState.channels)) {
    return mkErrorChannelDoesNotExist(channelId);
  }

  if (isUserAssociatedToChannel(userUUID, channelId, fishState.channels)) {
    return mkErrorUserIsAssociatedToChannel(userUUID, channelId);
  }

  return {
    type: 'ok',
    tagsWithEvents: [getChannelAssociatedUser(channelId, userUUID)],
    result: undefined,
  };
};
