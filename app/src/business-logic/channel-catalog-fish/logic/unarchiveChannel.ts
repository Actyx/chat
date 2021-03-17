import {
  mkChannelUserIsNotOwner,
  mkErrorAutheticationUserIsNotSignIn,
  mkErrorChannelDoesNotExist,
} from '../../common/errors';
import { ChannelId } from '../../message/types';
import { isSignedInUser } from '../../user-catalog-fish/logic/helpers';
import { UserUUID } from '../../user-catalog-fish/types';
import { getChannelUnarchived } from '../events';
import { hasUserCreatedChannel, isChannelIdRegistered } from '../logic-helpers';
import { ChannelCatalogFishState, UnarchiveChannelLogicResult } from '../types';

export const unarchiveChannel = (
  fishState: ChannelCatalogFishState,
  userUUID: UserUUID,
  channelId: ChannelId
): UnarchiveChannelLogicResult => {
  if (!isSignedInUser(userUUID)) {
    return mkErrorAutheticationUserIsNotSignIn();
  }

  if (!isChannelIdRegistered(channelId, fishState.channels)) {
    return mkErrorChannelDoesNotExist(channelId);
  }

  if (!hasUserCreatedChannel(userUUID, channelId, fishState.channels)) {
    return mkChannelUserIsNotOwner(userUUID, channelId);
  }

  return {
    type: 'ok',
    tagsWithEvents: [getChannelUnarchived(channelId, userUUID)],
    result: undefined,
  };
};
