import {
  mkChannelUserIsNotOwner,
  mkErrorAutheticationUserIsNotSignIn,
  mkErrorChannelDoesNotExist,
} from '../../common/errors';
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
    return mkErrorChannelDoesNotExist(channelId);
  }

  if (!hasUserCreatedChannel(userUUID, channelId, fishState.channels)) {
    return mkChannelUserIsNotOwner(userUUID, channelId);
  }

  return {
    type: 'ok',
    tagsWithEvents: [getChannelArchived(channelId, userUUID)],
    result: undefined,
  };
};
