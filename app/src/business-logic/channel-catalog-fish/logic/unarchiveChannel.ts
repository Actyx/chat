import { logBugBl } from '../../../logger/logger';
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
    const message = `Cannot archive channel (${channelId}) as it is not registered in the system`;
    logBugBl(message);
    return {
      type: 'error',
      code: ErrorCode.ChannelDoesNotExist,
      message,
    };
  }

  return {
    type: 'ok',
    tagsWithEvents: [getChannelUnarchived(channelId, userUUID)],
    result: undefined,
  };
};
