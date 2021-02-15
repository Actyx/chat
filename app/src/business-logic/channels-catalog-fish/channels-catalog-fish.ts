/**
 * The ChannelsCatalogFish is responsible to show all channels in the app and manage and keep track of their profile.
 * It also has the responsibility to keep the relationship of which users have joined a channel.
 */

import { Fish, FishId, Tag } from '@actyx/pond';
import { reducer } from './reducer';
import { ChannelsCatalogFishEvent, ChannelsCatalogFishState } from './types';

const tags = {
  channel: Tag<ChannelsCatalogFishEvent>('channel'),
  channelsCatalog: Tag<ChannelsCatalogFishEvent>('channels-catalog'),
};

const initialState: ChannelsCatalogFishState = {};

const fish: Fish<ChannelsCatalogFishState, ChannelsCatalogFishEvent> = {
  fishId: FishId.of('channelsCatalog', 'channelsCatalog', 0),
  initialState,
  onEvent: reducer,
  where: tags.channelsCatalog.or(tags.channel),
};

export const ChannelsCatalogFish = {
  fish,
  tags,
};
