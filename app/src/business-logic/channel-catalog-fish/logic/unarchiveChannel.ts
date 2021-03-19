import {
  mkChannelUserIsNotOwner,
  mkErrorAutheticationUserIsNotSignIn,
  mkErrorChannelDoesNotExist,
} from '../../common/errors';
import { LogicResult } from '../../common/logic-types';
import { ChannelId } from '../../message/types';
import { isSignedInUser2 } from '../../user-catalog-fish/logic/helpers';
import { Users, UserUUID } from '../../user-catalog-fish/types';
import { getChannelUnarchived } from '../events';
import { hasUserCreatedChannel, isChannelIdRegistered } from '../logic-helpers';
import { ChannelCatalogFishState, ChannelUnarchiveEvent } from '../types';

export const unarchiveChannel = (
  fishState: ChannelCatalogFishState,
  users: Users,
  userUUID: UserUUID,
  channelId: ChannelId
): LogicResult<ChannelUnarchiveEvent> => {
  if (!isSignedInUser2(userUUID, users)) {
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
