import {
  mkErrorAutheticationUserIsNotSignIn,
  mkErrorChannelDoesNotExist,
  mkErrorUserIsNotAssociatedToChannel,
} from '../../common/errors';
import { ChannelId } from '../../message/types';
import { isSignedInUser } from '../../user-catalog-fish/logic/helpers';
import { UserUUID } from '../../user-catalog-fish/types';
import { getChannelDissociatedUser } from '../events';
import {
  isChannelIdRegistered,
  isUserAssociatedToChannel,
} from '../logic-helpers';
import {
  ChannelCatalogFishState,
  DissociateUserChannelLogicResult,
} from '../types';

export const dissociateUserChannelLogic = (
  fishState: ChannelCatalogFishState,
  userUUID: UserUUID,
  channelId: ChannelId
): DissociateUserChannelLogicResult => {
  if (!isSignedInUser(userUUID)) {
    return mkErrorAutheticationUserIsNotSignIn();
  }

  if (!isChannelIdRegistered(channelId, fishState.channels)) {
    return mkErrorChannelDoesNotExist(channelId);
  }

  if (!isUserAssociatedToChannel(userUUID, channelId, fishState.channels)) {
    return mkErrorUserIsNotAssociatedToChannel(userUUID, channelId); // FIX change name here
  }

  return {
    type: 'ok',
    tagsWithEvents: [getChannelDissociatedUser(channelId, userUUID)],
    result: undefined,
  };
};
