import { Fish, FishId, Tag } from '@actyx/pond';
import { ChannelFishState } from './types';
import { PublicMessageEvent } from '../message/types';
import { reducer } from './reducer';

export const MAIN_CHANNEL = 'main';

const tags = {
  channel: Tag<PublicMessageEvent>('channel'),
  message: Tag<PublicMessageEvent>('message'),
  sender: Tag<PublicMessageEvent>('sender'),
};

const initialState: ChannelFishState = {
  messages: [],
};

export const initialStateCannelFish = initialState;

const factoryFish = (
  channelName: string
): Fish<ChannelFishState, PublicMessageEvent> => ({
  fishId: FishId.of('channel', channelName, 0),
  initialState,
  onEvent: reducer,
  where: tags.message.and(tags.channel.withId(channelName)),
});

export const ChannelFish = {
  tags,
};

export const mainChannelFish = factoryFish(MAIN_CHANNEL);
