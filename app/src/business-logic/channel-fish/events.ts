import { TagsWithEvent } from '../../common/types';
import {
  ChannelId,
  MessageContentEditedEvent,
  MessageEventType,
  MessageHiddenEvent,
  MessageId,
  PublicMessageAddedEvent,
  PublicMessageAddedEventPaylod,
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
  ChannelFish.tags.messagesCatalog.and(
    mkChannelTagWithId(channelId).and(
      mkMessageTagWithId(messageId).and(mkUserTagWithId(userUUID))
    )
  );

export const getPublicMessageAdded = (
  payload: PublicMessageAddedEventPaylod
): TagsWithEvent<PublicMessageAddedEvent> => {
  const event: PublicMessageAddedEvent = {
    type: MessageEventType.PublicMessageAdded,
    payload,
  };
  const tags = mkMessageOperationTag(
    payload.messageId,
    payload.channelId,
    payload.createdBy
  );

  return [tags, event];
};

export const getMessageContentEdited = (
  messageId: MessageId,
  channelId: ChannelId,
  content: string,
  userUUID: UserUUID
): TagsWithEvent<MessageContentEditedEvent> => {
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
): TagsWithEvent<MessageHiddenEvent> => {
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
