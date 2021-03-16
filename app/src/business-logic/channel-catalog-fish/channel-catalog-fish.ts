/**
 * The ChannelsCatalogFish is responsible to show all channels in the app and manage and keep track of their profile.
 * It also has the responsibility to keep the relationship of which users have joined a channel.
 */

import { Fish, FishId } from '@actyx/pond';
import { channelCatalogTag } from '../tags/tags';
import { reducer } from './reducer';
import { ChannelCatalogFishEvent, ChannelCatalogFishState } from './types';

const initialState: ChannelCatalogFishState = {
  channels: {},
};

export const ChannelCatalogFish: Fish<
  ChannelCatalogFishState,
  ChannelCatalogFishEvent
> = {
  fishId: FishId.of('channelCatalog', 'channelCatalog', 0),
  initialState,
  onEvent: reducer,
  where: channelCatalogTag,
};
