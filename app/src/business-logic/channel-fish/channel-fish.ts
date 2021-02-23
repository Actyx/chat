/**
 * The ChannelFish is responsible for displaying all messages related to a specific channel. A user is only active on one channel at one time.
 */

import { Fish, FishId, Tag } from '@actyx/pond';
import { ChannelFishState } from './types';
import { PublicMessageEvent } from '../message/types';
import { reducer } from './reducer';

export const MAIN_CHANNEL = 'main';

const tags = {
  messagesCatalog: Tag<PublicMessageEvent>('messages-catalog'),
  channel: Tag<PublicMessageEvent>('channel'),
  message: Tag<PublicMessageEvent>('message'),
  sender: Tag<PublicMessageEvent>('sender'),
};

const initialState: ChannelFishState = {
  messages: [],
};

export const mkChannelFish = (
  channelName: string
): Fish<ChannelFishState, PublicMessageEvent> => ({
  fishId: FishId.of('channel', channelName, 0),
  initialState,
  onEvent: reducer,
  where: tags.messagesCatalog.and(tags.channel.withId(channelName)),
});

export const ChannelFish = {
  tags,
};
