import {
  ChannelId,
  MessageEventType,
  PublicMessageAddedEvent,
  PublicMessageAddedEventPaylod,
  SenderId,
} from '../message/types';
import { ChannelFish } from './channel-fish';

export const mkPublicMessageAddedEvent = (
  payload: PublicMessageAddedEventPaylod
): PublicMessageAddedEvent => ({
  type: MessageEventType.PublicMessageAdded,
  payload,
});

export const mkPublicMessageAddedTags = (
  channelId: ChannelId,
  senderId: SenderId
) => {
  const tags = ChannelFish.tags.message.and(
    ChannelFish.tags.channel
      .withId(channelId)
      .and(ChannelFish.tags.messageSender.withId(senderId))
  );
  return tags;
};
