import { logBugBl } from '../../logger/logger';
import { ChannelId } from '../message/types';
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
