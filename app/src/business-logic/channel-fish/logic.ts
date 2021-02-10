import { Pond } from '@actyx/pond';
import {
  ChannelId,
  MediasIds,
  MessageId,
  PublicMessage,
  PublicRecipientsIds,
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
) => ({
  content,
  mediasIds,
  recipientsIds,
}: Readonly<{
  content: string;
  mediasIds?: MediasIds;
  recipientsIds?: PublicRecipientsIds;
}>): Promise<boolean> => {
  return new Promise((res, rej) => {
    pond
      .run(ChannelFish.mainFish, (_, enqueue) => {
        const event = mkPublicMessageAddedEvent({
          messageId: uuid(),
          senderId,
          channelId,
          content,
          mediasIds,
          recipientsIds,
        });
        const tags = mkPublicMessageAddedTags(channelId, senderId);
        enqueue(tags, event);
      })
      .toPromise()
      .then(() => res(true))
      .catch(rej);
  });
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
): boolean => message.senderId === userUUID && message.isHidden === false;

const getMessageById = (
  messageId: MessageId,
  messages: PublicMessages
): PublicMessage | undefined => messages.find((m) => m.messageId === messageId);

export const editMessageInChannel = (pond: Pond) => (channelId: ChannelId) => (
  messages: PublicMessages
) => (signedInUserUUID: UserUUID) => (
  messageId: MessageId,
  content: string
): Promise<boolean> => {
  return new Promise((res, rej) => {
    const message = getMessageById(messageId, messages);
    if (message) {
      const canEdit = doesMessageBelongToUser(signedInUserUUID, message);
      if (canEdit) {
        pond
          .run(ChannelFish.mainFish, (_, enqueue) => {
            const event = mkMessageContentEditedEvent(messageId, content);
            const tags = mkMessageContentEditedEventTags(channelId);
            enqueue(tags, event);
          })
          .toPromise()
          .then(() => res(true))
          .catch(rej);
      } else {
        res(false);
      }
    } else {
      res(false);
    }
  });
};

//#endregion

//#region Hide message

export const hideMessageFromChannel = (pond: Pond) => (
  channelId: ChannelId
) => (messages: PublicMessages) => (signedInUserUUID: UserUUID) => (
  messageId: MessageId
): Promise<boolean> => {
  return new Promise((res, rej) => {
    const message = getMessageById(messageId, messages);
    if (message) {
      const canHide = doesMessageBelongToUser(signedInUserUUID, message);
      if (canHide) {
        pond
          .run(ChannelFish.mainFish, (_, enqueue) => {
            const event = mkMessageHiddenEvent(messageId);
            const tags = mkMessageHiddenEventTags(channelId);
            enqueue(tags, event);
          })
          .toPromise()
          .then(() => res(true))
          .catch(rej);
      } else {
        res(false);
      }
    } else {
      res(false);
    }
  });
};

//#endregion
