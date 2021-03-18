import { DEFAULT_CHANNEL } from '../../channel-fish/channel-fish';
import {
  mkErrorAutheticationUserIsNotSignIn,
  mkErrorChannelDefaultAlredyExist,
} from '../../common/errors';
import { LogicResult } from '../../common/logic-types';
import { isSignedInUser } from '../../user-catalog-fish/logic/helpers';
import { UserUUID, SYSTEM_USER } from '../../user-catalog-fish/types';
import { getChannelAdded } from '../events';
import { isChannelIdRegistered } from '../logic-helpers';
import { ChannelAddedEvent, ChannelCatalogFishState } from '../types';

export const addDefaultChannelIfDoesNotExist = (
  fishState: ChannelCatalogFishState,
  userUUID: UserUUID
): LogicResult<ChannelAddedEvent> => {
  if (!isSignedInUser(userUUID)) {
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
