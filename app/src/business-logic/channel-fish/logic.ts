import { Pond } from '@actyx/pond';
import {
  ChannelId,
  MediaIds,
  MessageId,
  PublicMessage,
  PublicMessageEvent,
  PublicRecipientIds,
} from '../message/types';
import {
  getMessageContentEdited,
  getMessageHiddenEvent,
  getPublicMessageAdded,
} from './events';
import { UserUUID } from '../user-catalog-fish/types';
import { ChannelFishState, PublicMessages } from './types';
import { v4 as uuid } from 'uuid';
import { mkChannelFish } from './channel-fish';
import { ChannelCatalogFish } from '../channel-catalog-fish/channel-catalog-fish';
import { isChannelIdRegistered } from '../channel-catalog-fish/logic';
import { isSignedInUser } from '../user-catalog-fish/logic';

//#region Add message

export const addMessageToChannel = (pond: Pond) => (
  channelId: ChannelId,
  userUUID: UserUUID
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
  if (isSignedInUser(userUUID)) {
    await pond
      .run(ChannelCatalogFish, (fishState, enqueue) => {
        const canAdd = isChannelIdRegistered(channelId, fishState.channels);
        if (canAdd) {
          enqueue(
            ...getPublicMessageAdded({
              messageId: uuid(),
              createdBy: userUUID,
              channelId,
              content,
              mediaIds,
              recipientIds,
            })
          );
          isSuccess = true;
        }
      })
      .toPromise();
  }
  return isSuccess;
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
): boolean => doesMessageBelongToUser(userUUID, message) && !message.isHidden;

const getMessageById = (
  messageId: MessageId,
  messages: PublicMessages
): PublicMessage | undefined => messages.find((m) => m.messageId === messageId);

export const editMessageInChannel = (pond: Pond) => (
  channelId: ChannelId,
  userUUID: UserUUID
) => async (messageId: MessageId, content: string): Promise<boolean> => {
  let isSuccess = false;
  if (isSignedInUser(userUUID)) {
    await pond
      .run<ChannelFishState, PublicMessageEvent>(
        mkChannelFish(channelId),
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
      mkChannelFish(channelId),
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
