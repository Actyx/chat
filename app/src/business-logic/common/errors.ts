import { logBugBl } from '../../logger/logger';
import { ChannelId, MessageId } from '../message/types';
import { UserUUID } from '../user-catalog-fish/types';
import { ErrorCode, LogicResultError } from './logic-types';

export const mkErrorAutheticationUserIsNotSignIn = (): LogicResultError => {
  const code = ErrorCode.AutheticationUserIsNotSignedIn;
  logBugBl(code);
  return {
    type: 'error',
    code,
    message: 'User is not signed in',
  };
};

export const mkErrorChannelDoesNotExist = (
  channelId: ChannelId
): LogicResultError => {
  const message = `Channel (${channelId}) as it is not registered in the system`;
  logBugBl(message);
  return {
    type: 'error',
    code: ErrorCode.ChannelDoesNotExist,
    message,
  };
};

export const mkChannelUserIsNotOwner = (
  userUUID: UserUUID,
  channelId: ChannelId
): LogicResultError => {
  const message = `User (${userUUID}) is not the owner of this channel (${channelId})`;
  logBugBl(message);
  return {
    type: 'error',
    code: ErrorCode.ChannelUserIsNotOwner,
    message,
  };
};

export const mkErrorDoesChannelNameExist = (
  channelName: string
): LogicResultError => {
  return {
    type: 'error',
    code: ErrorCode.ChannelNameExist,
    message: `The channel name (${channelName}) has been already registered in the system`,
  };
};

export const mkErrorUserIsNotAssociatedToChannel = (
  userUUID: UserUUID,
  channelId: ChannelId
): LogicResultError => {
  const message = `User (${userUUID}) is not associated to channel (${channelId})`;
  logBugBl(message);
  return {
    type: 'error',
    code: ErrorCode.ChannelUserIsNotAssociated,
    message,
  };
};

export const mkErrorUserIsAssociatedToChannel = (
  userUUID: UserUUID,
  channelId: ChannelId
): LogicResultError => {
  const message = `User (${userUUID}) is associated to channel (${channelId})`;
  logBugBl(message);
  return {
    type: 'error',
    code: ErrorCode.ChannelUserIsAssociated,
    message,
  };
};

export const mkErrorMessageDoesNotExist = (
  messageId: MessageId
): LogicResultError => {
  return {
    type: 'error',
    code: ErrorCode.MessageDoesNotExist,
    message: `Cannot edit a not existing message (${messageId})`,
  };
};

export const mkErrorMessageUserIsNotOwner = (
  messageId: MessageId,
  userUUID: UserUUID
): LogicResultError => {
  return {
    type: 'error',
    code: ErrorCode.MessageUserIsNotOwner,
    message: `Cannot edit message (${messageId}) does not belong to user (${userUUID}) `,
  };
};
