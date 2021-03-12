import { logBugBl } from '../../logger/logger';
import { ErrorCode, LogicResult } from './logic-types';

export const mkErrorAutheticationUserIsNotSignIn = <T>(): LogicResult<T> => {
  const code = ErrorCode.AutheticationUserIsNotSignedIn;
  logBugBl(code);
  return {
    type: 'error',
    code,
    message: 'User is not signed-in'
  };
};
