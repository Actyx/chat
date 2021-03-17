import {
  mkErrorChannelDoesNotExist,
  mkErrorUserIsNotAssociatedToChannel,
} from '../../common/errors';
import { ChannelId } from '../../message/types';
import { UserUUID } from '../../user-catalog-fish/types';
import { getChannelAssociatedUser } from '../events';
import { isChannelIdRegistered } from '../logic';
import { isUserAssociatedToChannel } from '../logic-helpers';
import {
  AssociateUserToChannelLogicResult,
  ChannelCatalogFishState,
} from '../types';

export const associateUserToChannelLogic = (
  fishState: ChannelCatalogFishState,
  userUUID: UserUUID,
  channelId: ChannelId
): AssociateUserToChannelLogicResult => {
  if (!isChannelIdRegistered(channelId, fishState.channels)) {
    return mkErrorChannelDoesNotExist(channelId);
  }

  if (isUserAssociatedToChannel(userUUID, channelId, fishState.channels)) {
    return mkErrorUserIsNotAssociatedToChannel(userUUID, channelId);
  }

  return {
    type: 'ok',
    tagsWithEvents: [getChannelAssociatedUser(channelId, userUUID)],
    result: undefined,
  };
};
