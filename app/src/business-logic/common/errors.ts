import { logBugBl } from '../../logger/logger';
import { ErrorType, LogicResult } from './logic-types';

export const mkErrorAutheticationUserIsNotSignIn = <T>(): LogicResult<T> => {
  const errorType = ErrorType.Authetication_UserIsNotSignedIn;
  const errorMessage = 'User is not signed-in';
  logBugBl(ErrorType.Authetication_UserIsNotSignedIn);
  return {
    status: 'error',
    errorType,
    errorMessage,
  };
};
