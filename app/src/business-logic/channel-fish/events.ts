import { TagsWithEvent } from '../../common/types';
import {
  ChannelId,
  MessageContentEditedEvent,
  MessageEventType,
  MessageHiddenEvent,
  MessageId,
  PublicMessageAddedEvent,
  PublicMessageAddedEventPaylod,
  PublicMessageEvent,
} from '../message/types';
import { UserUUID } from '../users-catalog-fish/types';
import { UsersCatalogFish } from '../users-catalog-fish/users-catalog-fish';
import { ChannelFish } from './channel-fish';

export const mkSenderTag = (senderId: UserUUID) =>
  ChannelFish.tags.sender.withId(senderId);

export const getPublicMessageAdded = (
  payload: PublicMessageAddedEventPaylod
): TagsWithEvent<PublicMessageEvent> => {
  const event: PublicMessageAddedEvent = {
    type: MessageEventType.PublicMessageAdded,
    payload,
  };
  const tags = ChannelFish.tags.messagesCatalog.and(
    ChannelFish.tags.message
      .withId(payload.messageId)
      .and(
        ChannelFish.tags.channel
          .withId(payload.channelId)
          .and(mkSenderTag(payload.senderId))
      )
  );
  return [tags, event];
};

export const getMessageContentEdited = (
  messageId: MessageId,
  channelId: ChannelId,
  content: string,
  userUUID: UserUUID
): TagsWithEvent<PublicMessageEvent> => {
  const event: MessageContentEditedEvent = {
    type: MessageEventType.MessageContentEdited,
    payload: {
      messageId,
      content,
    },
  };

  const tags = ChannelFish.tags.message
    .withId(messageId)
    .and(
      ChannelFish.tags.channel
        .withId(channelId)
        .and(UsersCatalogFish.tags.user.withId(userUUID))
    );

  return [tags, event];
};

export const getMessageHiddenEvent = (
  messageId: MessageId,
  channelId: ChannelId,
  userUUID: UserUUID
): TagsWithEvent<PublicMessageEvent> => {
  const event: MessageHiddenEvent = {
    type: MessageEventType.MessageHidden,
    payload: {
      messageId,
    },
  };
  const tags = ChannelFish.tags.message
    .withId(messageId)
    .and(
      ChannelFish.tags.channel
        .withId(channelId)
        .and(UsersCatalogFish.tags.user.withId(userUUID))
    );
  return [tags, event];
};
