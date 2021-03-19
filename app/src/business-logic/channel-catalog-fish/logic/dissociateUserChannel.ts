import {
  mkErrorAutheticationUserIsNotSignIn,
  mkErrorChannelDoesNotExist,
  mkErrorUserIsNotAssociatedToChannel,
} from '../../common/errors';
import { LogicResult } from '../../common/logic-types';
import { ChannelId } from '../../message/types';
import { isSignedInUser } from '../../user-catalog-fish/logic/helpers';
import { Users, UserUUID } from '../../user-catalog-fish/types';
import { getChannelDissociatedUser } from '../events';
import {
  isChannelIdRegistered,
  isUserAssociatedToChannel,
} from '../logic-helpers';
import { ChannelCatalogFishState, ChannelDissociatedUserEvent } from '../types';

export const dissociateUserChannel = (
  fishState: ChannelCatalogFishState,
  users: Users,
  userUUID: UserUUID,
  channelId: ChannelId
): LogicResult<ChannelDissociatedUserEvent> => {
  if (!isSignedInUser(userUUID, users)) {
    return mkErrorAutheticationUserIsNotSignIn();
  }

  if (!isChannelIdRegistered(channelId, fishState.channels)) {
    return mkErrorChannelDoesNotExist(channelId);
  }

  if (!isUserAssociatedToChannel(userUUID, channelId, fishState.channels)) {
    return mkErrorUserIsNotAssociatedToChannel(userUUID, channelId); // FIX change name here
  }

  return {
    type: 'ok',
    tagsWithEvents: [getChannelDissociatedUser(channelId, userUUID)],
    result: undefined,
  };
};
