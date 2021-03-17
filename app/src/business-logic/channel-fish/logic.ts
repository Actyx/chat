import { Pond } from '@actyx/pond';
import {
  ChannelId,
  MediaIds,
  MessageId,
  PublicMessage,
  PublicRecipientIds,
} from '../message/types';
import { getPublicMessageAdded } from './events';
import { UserUUID } from '../user-catalog-fish/types';
import { PublicMessages } from './types';
import { v4 as uuid } from 'uuid';
import { ChannelCatalogFish } from '../channel-catalog-fish/channel-catalog-fish';
import { isSignedInUser } from '../user-catalog-fish/logic/helpers';
import { isChannelIdRegistered } from '../channel-catalog-fish/logic-helpers';

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

export const doesMessageBelongToUser = (
  userUUID: UserUUID,
  message: PublicMessage
): boolean => message.createdBy === userUUID;

export const canUserHideMessage = (
  userUUID: UserUUID,
  message: PublicMessage
): boolean => doesMessageBelongToUser(userUUID, message) && !message.isHidden;

export const getMessageById = (
  messageId: MessageId,
  messages: PublicMessages
): PublicMessage | undefined => messages.find((m) => m.messageId === messageId);
