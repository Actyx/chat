import {
  ChannelId,
  MessageContentEditedEvent,
  MessageEventType,
  MessageId,
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

export const mkMessageContentEditedEvent = (
  messageId: MessageId,
  content: string
): MessageContentEditedEvent => ({
  type: MessageEventType.MessageContentEdited,
  payload: {
    messageId,
    content,
  },
});

export const mkMessageContentEditedEventTags = (channelId: ChannelId) => {
  const tags = ChannelFish.tags.message.and(
    ChannelFish.tags.channel.withId(channelId)
  );
  return tags;
};
