import { DEFAULT_CHANNEL } from '../../channel-fish/channel-fish';
import {
  mkErrorAutheticationUserIsNotSignIn,
  mkErrorChannelDefaultAlredyExist,
} from '../../common/errors';
import { isSignedInUser } from '../../user-catalog-fish/logic/helpers';
import { UserUUID, SYSTEM_USER } from '../../user-catalog-fish/types';
import { getChannelAdded } from '../events';
import { isChannelIdRegistered } from '../logic-helpers';
import { ChannelCatalogFishState } from '../types';
import { AddDefaultChannelIfDoesNotExistLogicResult } from './logic-types';

export const addDefaultChannelIfDoesNotExist = (
  fishState: ChannelCatalogFishState,
  userUUID: UserUUID
): AddDefaultChannelIfDoesNotExistLogicResult => {
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
