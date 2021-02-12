import { Tags } from '@actyx/pond';
import {
  ChannelId,
  MessageContentEditedEvent,
  MessageEventType,
  MessageHiddenEvent,
  MessageId,
  PublicMessageAddedEvent,
  PublicMessageAddedEventPaylod,
  PublicMessageEvent,
  SenderId,
} from '../message/types';
import { UserUUID } from '../users-catalog-fish/types';
import { ChannelFish } from './channel-fish';

export const mkPublicMessageAddedEvent = (
  payload: PublicMessageAddedEventPaylod
): PublicMessageAddedEvent => ({
  type: MessageEventType.PublicMessageAdded,
  payload,
});

export const mkSenderTag = (senderId: UserUUID) =>
  ChannelFish.tags.sender.withId(senderId);

export const mkPublicMessageAddedTags = (
  channelId: ChannelId,
  senderId: SenderId
): Tags<PublicMessageEvent> => {
  const tags = ChannelFish.tags.message.and(
    ChannelFish.tags.channel.withId(channelId).and(mkSenderTag(senderId))
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

export const mkMessageContentEditedEventTags = (
  channelId: ChannelId
): Tags<PublicMessageEvent> => {
  const tags = ChannelFish.tags.message.and(
    ChannelFish.tags.channel.withId(channelId)
  );
  return tags;
};

export const mkMessageHiddenEvent = (
  messageId: MessageId
): MessageHiddenEvent => ({
  type: MessageEventType.MessageHidden,
  payload: {
    messageId,
  },
});
export const mkMessageHiddenEventTags = (
  channelId: ChannelId
): Tags<PublicMessageEvent> => {
  const tags = ChannelFish.tags.message.and(
    ChannelFish.tags.channel.withId(channelId)
  );
  return tags;
};
