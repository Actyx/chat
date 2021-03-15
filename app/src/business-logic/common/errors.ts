import { logBugBl } from '../../logger/logger';
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
