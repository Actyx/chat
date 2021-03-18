import { logBugBl } from '../../logger/logger';
import { DEFAULT_CHANNEL } from '../channel-fish/channel-fish';
import { ChannelId, MessageId } from '../message/types';
import { Email, UserUUID } from '../user-catalog-fish/types';
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
  const message = `The channel name (${channelName}) has been already registered in the system`;
  logBugBl(message);
  return {
    type: 'error',
    code: ErrorCode.ChannelNameExist,
    message,
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
  const message = `Cannot edit a not existing message (${messageId})`;
  logBugBl(message);
  return {
    type: 'error',
    code: ErrorCode.MessageDoesNotExist,
    message,
  };
};

export const mkErrorMessageUserIsNotOwner = (
  messageId: MessageId,
  userUUID: UserUUID
): LogicResultError => {
  const message = `Cannot edit message (${messageId}) does not belong to user (${userUUID}) `;
  logBugBl(message);
  return {
    type: 'error',
    code: ErrorCode.MessageUserIsNotOwner,
    message,
  };
};

export const mkErrorSignUpEmailAlreadyExists = (
  email: Email
): LogicResultError => {
  return {
    type: 'error',
    code: ErrorCode.SignUpEmailAlreadyExists,
    message: `New user cannot sign up, email provided (${email}) is already registered in the system`,
  };
};

export const mkErrorChannelDefaultAlredyExist = (): LogicResultError => {
  return {
    type: 'error',
    code: ErrorCode.ChannelDefaultAlredyExist,
    message: `Default channel (${DEFAULT_CHANNEL.channelId}) already exist`,
  };
};

export const mkErrorUserEditProfileUserIsNotRegistered = (
  userUUID: UserUUID
): LogicResultError => {
  const code = ErrorCode.UserEditProfileUserIsNotRegistered;
  logBugBl(code);
  return {
    type: 'error',
    code,
    message: `UserUUID provided (${userUUID}) is not registered in the system`,
  };
};
