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
import { channelTag2, messagesCatalogTag, messageTag } from '../tags/tags';
import { mkUserTagWithId } from '../user-catalog-fish/events';
import { UserUUID } from '../user-catalog-fish/types';

const mkMessageTagWithId = (messageId: MessageId) =>
  messageTag.withId(messageId);

export const mkChannelTagWithId = (channelId: ChannelId) =>
  channelTag2.withId(channelId);

const mkMessageOperationTag = (
  messageId: MessageId,
  channelId: ChannelId,
  userUUID: UserUUID
) =>
  messagesCatalogTag.and(
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
