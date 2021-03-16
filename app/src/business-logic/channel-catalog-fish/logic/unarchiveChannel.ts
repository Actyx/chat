import { logBugBl } from '../../../logger/logger';
import { mkErrorChannelDoesNotExist } from '../../common/errors';
import { ErrorCode } from '../../common/logic-types';
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
    const message = `Cannot unarchive this channel because its user (${userUUID}) is not the owner of this channel (${channelId})`;
    logBugBl(message);
    return {
      type: 'error',
      code: ErrorCode.ChannelUserIsNotOwner,
      message,
    };
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
