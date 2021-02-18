import { Pond } from '@actyx/pond';
import {
  ChannelId,
  MediaIds,
  MessageId,
  PublicMessage,
  PublicMessageEvent,
  PublicRecipientIds,
} from '../message/types';
import { mainChannelFish } from './channel-fish';
import {
  getMessageContentEdited,
  getMessageHiddenEvent,
  getPublicMessageAdded,
} from './events';
import { UserUUID, ANONYMOUSE_USER } from '../users-catalog-fish/types';
import { ChannelFishState, PublicMessages } from './types';
import { v4 as uuid } from 'uuid';

//#region Add message

export const addMessageToChannel = (pond: Pond) => (
  channelId: ChannelId,
  userUUID: UserUUID
) => ({
  content,
  mediaIds,
  recipientIds,
}: Readonly<{
  content: string;
  mediaIds?: MediaIds;
  recipientIds?: PublicRecipientIds;
}>): Promise<void> => {
  if (isUserSignedIn(userUUID)) {
    return pond
      .emit(
        ...getPublicMessageAdded({
          messageId: uuid(),
          createdBy: userUUID,
          channelId,
          content,
          mediaIds,
          recipientIds,
        })
      )
      .toPromise();
  }
  return Promise.resolve(undefined);
};
//#endregion

//#region Edit message

export const doesMessageBelongToUser = (
  userUUID: UserUUID,
  message: PublicMessage
): boolean => message.createdBy === userUUID;

export const canUserHideMessage = (
  userUUID: UserUUID,
  message: PublicMessage
): boolean =>
  doesMessageBelongToUser(userUUID, message) && message.isHidden === false;

const getMessageById = (
  messageId: MessageId,
  messages: PublicMessages
): PublicMessage | undefined => messages.find((m) => m.messageId === messageId);

export const editMessageInChannel = (pond: Pond) => (
  channelId: ChannelId,
  userUUID: UserUUID
) => async (messageId: MessageId, content: string): Promise<boolean> => {
  let isSuccess = false;
  if (isUserSignedIn(userUUID)) {
    await pond
      .run<ChannelFishState, PublicMessageEvent>(
        mainChannelFish,
        (fishState, enqueue) => {
          const message = getMessageById(messageId, fishState.messages);
          if (message) {
            const canEdit = doesMessageBelongToUser(userUUID, message);
            if (canEdit) {
              enqueue(
                ...getMessageContentEdited(
                  messageId,
                  channelId,
                  content,
                  userUUID
                )
              );
              isSuccess = true;
            }
          }
        }
      )
      .toPromise();
  }
  return isSuccess;
};

//#endregion

//#region Hide message

export const hideMessageFromChannel = (pond: Pond) => (
  channelId: ChannelId,
  userUUID: UserUUID
) => async (messageId: MessageId): Promise<boolean> => {
  let isSuccess = false;
  await pond
    .run<ChannelFishState, PublicMessageEvent>(
      mainChannelFish,
      (fishState, enqueue) => {
        const message = getMessageById(messageId, fishState.messages);
        if (message) {
          const canHide = doesMessageBelongToUser(userUUID, message);
          if (canHide) {
            enqueue(...getMessageHiddenEvent(messageId, channelId, userUUID));
            isSuccess = true;
          }
        }
      }
    )
    .toPromise();
  return isSuccess;
};

//#endregion

//#region Others

export const isUserSignedIn = (userUUID: UserUUID) =>
  userUUID !== ANONYMOUSE_USER;

//#endregion
