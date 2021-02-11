import { Pond } from '@actyx/pond';
import {
  ChannelId,
  MediaIds,
  MessageId,
  PublicMessage,
  PublicRecipientIds,
  SenderId,
} from '../message/types';
import { ChannelFish } from './channel-fish';
import { v4 as uuid } from 'uuid';
import {
  mkMessageContentEditedEvent,
  mkMessageContentEditedEventTags,
  mkMessageHiddenEvent,
  mkMessageHiddenEventTags,
  mkPublicMessageAddedEvent,
  mkPublicMessageAddedTags,
} from './events';
import { UserUUID } from '../users-catalog-fish/types';
import { PublicMessages } from './types';

//#region Add message

export const addMessageToChannel = (pond: Pond) => (channelId: ChannelId) => (
  senderId: SenderId
) => async ({
  content,
  mediaIds,
  recipientIds,
}: Readonly<{
  content: string;
  mediaIds?: MediaIds;
  recipientIds?: PublicRecipientIds;
}>): Promise<boolean> => {
  let isSuccess = false;
  await pond
    .run(ChannelFish.mainFish, (_, enqueue) => {
      const event = mkPublicMessageAddedEvent({
        messageId: uuid(),
        senderId,
        channelId,
        content,
        mediaIds,
        recipientIds,
      });
      const tags = mkPublicMessageAddedTags(channelId, senderId);
      enqueue(tags, event);
      isSuccess = true;
    })
    .toPromise();
  return isSuccess;
};

//#endregion

//#region Edit message

export const doesMessageBelongToUser = (
  userUUID: UserUUID,
  message: PublicMessage
): boolean => message.senderId === userUUID;

export const canUserHideMessage = (
  userUUID: UserUUID,
  message: PublicMessage
): boolean =>
  doesMessageBelongToUser(userUUID, message) && message.isHidden === false;

const getMessageById = (
  messageId: MessageId,
  messages: PublicMessages
): PublicMessage | undefined => messages.find((m) => m.messageId === messageId);

export const editMessageInChannel = (pond: Pond) => (channelId: ChannelId) => (
  signedInUserUUID: UserUUID
) => async (messageId: MessageId, content: string): Promise<boolean> => {
  let isSuccess = false;
  await pond
    .run(ChannelFish.mainFish, (fishState, enqueue) => {
      const message = getMessageById(messageId, fishState.messages);
      if (message) {
        const canEdit = doesMessageBelongToUser(signedInUserUUID, message);
        if (canEdit) {
          const event = mkMessageContentEditedEvent(messageId, content);
          const tags = mkMessageContentEditedEventTags(channelId);
          enqueue(tags, event);
          isSuccess = true;
        }
      }
    })
    .toPromise();
  return isSuccess;
};

//#endregion

//#region Hide message

export const hideMessageFromChannel = (pond: Pond) => (
  channelId: ChannelId
) => (signedInUserUUID: UserUUID) => async (
  messageId: MessageId
): Promise<boolean> => {
  let isSuccess = false;
  await pond
    .run(ChannelFish.mainFish, (fishState, enqueue) => {
      const message = getMessageById(messageId, fishState.messages);
      if (message) {
        const canHide = doesMessageBelongToUser(signedInUserUUID, message);
        if (canHide) {
          const event = mkMessageHiddenEvent(messageId);
          const tags = mkMessageHiddenEventTags(channelId);
          enqueue(tags, event);
          isSuccess = true;
        }
      }
    })
    .toPromise();
  return isSuccess;
};

//#endregion
