import {
  mkChannelUserIsNotOwner,
  mkErrorAutheticationUserIsNotSignIn,
  mkErrorChannelDoesNotExist,
} from '../../common/errors';
import { LogicResult } from '../../common/logic-types';
import { ChannelId } from '../../message/types';
import { isSignedInUser } from '../../user-catalog-fish/logic/helpers';
import { Users, UserUUID } from '../../user-catalog-fish/types';
import { getChannelArchived } from '../events';
import { hasUserCreatedChannel, isChannelIdRegistered } from '../logic-helpers';
import { ChannelArchivedEvent, ChannelCatalogFishState } from '../types';

export const archiveChannel = (
  fishState: ChannelCatalogFishState,
  users: Users,
  userUUID: UserUUID,
  channelId: ChannelId
): LogicResult<ChannelArchivedEvent> => {
  if (!isSignedInUser(userUUID, users)) {
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
