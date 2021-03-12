/**
 * The ChannelFish is responsible for displaying all messages related to a specific channel. A user is only active on one channel at one time.
 */

import { Fish, FishId } from '@actyx/pond';
import { ChannelFishState } from './types';
import { ChannelId, PublicMessageEvent } from '../message/types';
import { reducer } from './reducer';
import { channelTag, messagesCatalogTag } from '../tags/tags';

export const DEFAULT_CHANNEL: Readonly<{
  channelId: ChannelId;
  name: string;
}> = {
  channelId: 'main',
  name: 'Main',
};

const initialState: ChannelFishState = {
  messages: [],
};

export const mkChannelFish = (
  channelId: ChannelId
): Fish<ChannelFishState, PublicMessageEvent> => ({
  fishId: FishId.of('channel', channelId, 0),
  initialState,
  onEvent: reducer,
  where: messagesCatalogTag.and(channelTag.withId(channelId)),
});
