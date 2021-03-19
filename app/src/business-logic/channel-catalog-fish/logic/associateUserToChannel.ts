import {
  mkErrorAutheticationUserIsNotSignIn,
  mkErrorChannelDoesNotExist,
  mkErrorUserIsAssociatedToChannel,
} from '../../common/errors';
import { LogicResult } from '../../common/logic-types';
import { ChannelId } from '../../message/types';
import { isSignedInUser } from '../../user-catalog-fish/logic/helpers';
import { Users, UserUUID } from '../../user-catalog-fish/types';
import { getChannelAssociatedUser } from '../events';
import {
  isChannelIdRegistered,
  isUserAssociatedToChannel,
} from '../logic-helpers';
import { ChannelAssociatedUserEvent, ChannelCatalogFishState } from '../types';

export const associateUserToChannel = (
  fishState: ChannelCatalogFishState,
  users: Users,
  userUUID: UserUUID,
  channelId: ChannelId
): LogicResult<ChannelAssociatedUserEvent> => {
  if (!isSignedInUser(userUUID, users)) {
    return mkErrorAutheticationUserIsNotSignIn();
  }

  if (!isChannelIdRegistered(channelId, fishState.channels)) {
    return mkErrorChannelDoesNotExist(channelId);
  }

  if (isUserAssociatedToChannel(userUUID, channelId, fishState.channels)) {
    return mkErrorUserIsAssociatedToChannel(userUUID, channelId);
  }

  return {
    type: 'ok',
    tagsWithEvents: [getChannelAssociatedUser(channelId, userUUID)],
    result: undefined,
  };
};
