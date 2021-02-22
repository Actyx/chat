/**
 * The ChannelsCatalogFish is responsible to show all channels in the app and manage and keep track of their profile.
 * It also has the responsibility to keep the relationship of which users have joined a channel.
 */

import { Fish, FishId, Tag } from '@actyx/pond';
import { reducer } from './reducer';
import { ChannelCatalogFishEvent, ChannelCatalogFishState } from './types';

const tags = {
  channel: Tag<ChannelCatalogFishEvent>('channel'),
  channelCatalog: Tag<ChannelCatalogFishEvent>('channel-catalog'),
};

const initialState: ChannelCatalogFishState = {
  channels: {},
};

const fish: Fish<ChannelCatalogFishState, ChannelCatalogFishEvent> = {
  fishId: FishId.of('channelCatalog', 'channelCatalog', 0),
  initialState,
  onEvent: reducer,
  where: tags.channelCatalog,
};

export const ChannelCatalogFish = {
  fish,
  tags,
};
