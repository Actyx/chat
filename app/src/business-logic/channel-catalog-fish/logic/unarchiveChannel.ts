import {
  mkChannelUserIsNotOwner,
  mkErrorChannelDoesNotExist,
} from '../../common/errors';
import { ChannelId } from '../../message/types';
import { UserUUID } from '../../user-catalog-fish/types';
import { getChannelUnarchived } from '../events';
import { hasUserCreatedChannel, isChannelIdRegistered } from '../logic';
import { ChannelCatalogFishState, UnarchiveChannelLogicResult } from '../types';

export const unarchiveChannel = (
  fishState: ChannelCatalogFishState,
  userUUID: UserUUID,
  channelId: ChannelId
): UnarchiveChannelLogicResult => {
  if (!hasUserCreatedChannel(userUUID, channelId, fishState.channels)) {
    return mkChannelUserIsNotOwner(userUUID, channelId);
  }

  if (!isChannelIdRegistered(channelId, fishState.channels)) {
    return mkErrorChannelDoesNotExist(channelId);
  }

  return {
    type: 'ok',
    tagsWithEvents: [getChannelUnarchived(channelId, userUUID)],
    result: undefined,
  };
};
