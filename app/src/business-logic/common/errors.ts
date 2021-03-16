import { logBugBl } from '../../logger/logger';
import { ChannelId } from '../message/types';
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
