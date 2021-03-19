import { DEFAULT_CHANNEL } from '../../channel-fish/channel-fish';
import {
  mkErrorAutheticationUserIsNotSignIn,
  mkErrorChannelDefaultAlredyExist,
} from '../../common/errors';
import { LogicResult } from '../../common/logic-types';
import { isSignedInUser2 } from '../../user-catalog-fish/logic/helpers';
import { UserUUID, SYSTEM_USER, Users } from '../../user-catalog-fish/types';
import { getChannelAdded } from '../events';
import { isChannelIdRegistered } from '../logic-helpers';
import { ChannelAddedEvent, ChannelCatalogFishState } from '../types';

export const addDefaultChannelIfDoesNotExist = (
  fishState: ChannelCatalogFishState,
  users: Users,
  userUUID: UserUUID
): LogicResult<ChannelAddedEvent> => {
  if (!isSignedInUser2(userUUID, users)) {
    return mkErrorAutheticationUserIsNotSignIn();
  }

  const hasDefaultChannel = isChannelIdRegistered(
    DEFAULT_CHANNEL.channelId,
    fishState.channels
  );
  if (hasDefaultChannel) {
    return mkErrorChannelDefaultAlredyExist();
  }

  return {
    type: 'ok',
    tagsWithEvents: [
      getChannelAdded(
        DEFAULT_CHANNEL.channelId,
        SYSTEM_USER,
        DEFAULT_CHANNEL.name
      ),
    ],
    result: undefined,
  };
};
