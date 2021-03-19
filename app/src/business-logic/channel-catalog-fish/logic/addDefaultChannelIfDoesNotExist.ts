import { DEFAULT_CHANNEL } from '../../channel-fish/channel-fish';
import { mkErrorChannelDefaultAlredyExist } from '../../common/errors';
import { LogicResult } from '../../common/logic-types';
import { SYSTEM_USER } from '../../user-catalog-fish/types';
import { getChannelAdded } from '../events';
import { isChannelIdRegistered } from '../logic-helpers';
import { ChannelAddedEvent, ChannelCatalogFishState } from '../types';

export const addDefaultChannelIfDoesNotExist = (
  fishState: ChannelCatalogFishState
): LogicResult<ChannelAddedEvent> => {
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
