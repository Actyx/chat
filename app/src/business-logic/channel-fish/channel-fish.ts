import { Fish, FishId, Tag } from '@actyx/pond';
import { ChannelFishState } from './types';
import { PublicMessageEvent } from '../message/types';
import { reducer } from './reducer';

const tags = {
  channel: Tag<PublicMessageEvent>('channel'),
  message: Tag<PublicMessageEvent>('message'),
};

const initialState: ChannelFishState = {
  messages: [],
};

export const factory = (channelName: string) => {
  const fish: Fish<ChannelFishState, PublicMessageEvent> = {
    fishId: FishId.of('com.chat.channel', 'channel', 0),
    initialState,
    onEvent: reducer,
    where: tags.channel.withId(channelName),
  };
  return fish;
};

export const ChannelFish = {
  mainFish: factory('main'),
  tags,
};
