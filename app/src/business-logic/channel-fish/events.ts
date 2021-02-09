import {
  ChannelId,
  MessageEventType,
  PublicMessageAddedEvent,
  PublicMessageAddedEventPaylod,
} from '../message/types';
import { ChannelFish } from './channel-fish';

export const mkPublicMessageAddedEvent = (
  payload: PublicMessageAddedEventPaylod
): PublicMessageAddedEvent => ({
  type: MessageEventType.PublicMessageAdded,
  payload,
});

export const mkPublicMessageAddedTags = (channelId: ChannelId) => {
  const tags = ChannelFish.tags.message.and(
    ChannelFish.tags.channel.withId(channelId) // TODO improve tags
  );
  return tags;
};
