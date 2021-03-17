import { MessageId, PublicMessage } from '../message/types';
import { UserUUID } from '../user-catalog-fish/types';
import { PublicMessages } from './types';

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
