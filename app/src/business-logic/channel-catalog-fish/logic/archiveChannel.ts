import { logBugBl } from '../../../logger/logger';
import { mkErrorAutheticationUserIsNotSignIn } from '../../common/errors';
import { ErrorCode } from '../../common/logic-types';
import { ChannelId } from '../../message/types';
import { isSignedInUser } from '../../user-catalog-fish/logic/helpers';
import { UserUUID } from '../../user-catalog-fish/types';
import { getChannelArchived } from '../events';
import { hasUserCreatedChannel, isChannelIdRegistered } from '../logic';
import { ArchiveChannelLogicResult, ChannelCatalogFishState } from '../types';

export const archiveChannel = (
  fishState: ChannelCatalogFishState,
  userUUID: UserUUID,
  channelId: ChannelId
): ArchiveChannelLogicResult => {
  if (!isSignedInUser(userUUID)) {
    return mkErrorAutheticationUserIsNotSignIn();
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

  if (!hasUserCreatedChannel(userUUID, channelId, fishState.channels)) {
    const message = `Cannot archive this channel because its user (${userUUID}) is not the owner of this channel (${channelId})`;
    logBugBl(message);
    return {
      type: 'error',
      code: ErrorCode.ChannelUserIsNotOwner,
      message,
    };
  }

  return {
    type: 'ok',
    tagsWithEvents: [getChannelArchived(channelId, userUUID)],
    result: undefined,
  };
};
