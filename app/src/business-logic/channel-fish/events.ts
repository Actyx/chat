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
import { mkUserTagWithId } from '../users-catalog-fish/events';
import { UserUUID } from '../users-catalog-fish/types';
import { ChannelFish } from './channel-fish';

const mkMessageTagWithId = (messageId: MessageId) =>
  ChannelFish.tags.message.withId(messageId);

export const mkChannelTagWithId = (channelId: ChannelId) =>
  ChannelFish.tags.channel.withId(channelId);

const mkMessageOperationTag = (
  messageId: MessageId,
  channelId: ChannelId,
  userUUID: UserUUID
) =>
  mkMessageTagWithId(messageId).and(
    mkChannelTagWithId(channelId).and(mkUserTagWithId(userUUID))
  );

export const getPublicMessageAdded = (
  payload: PublicMessageAddedEventPaylod
): TagsWithEvent<PublicMessageEvent> => {
  const event: PublicMessageAddedEvent = {
    type: MessageEventType.PublicMessageAdded,
    payload,
  };
  const tags = ChannelFish.tags.messagesCatalog.and(
    mkMessageOperationTag(
      payload.messageId,
      payload.channelId,
      payload.userUUID
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
      editedBy: userUUID,
    },
  };

  const tags = mkMessageOperationTag(messageId, channelId, userUUID);

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
      hiddenBy: userUUID,
    },
  };
  const tags = mkMessageOperationTag(messageId, channelId, userUUID);

  return [tags, event];
};
