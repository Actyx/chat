import { Language } from '../common/l10n-types';
import { ErrorType } from '../common/logic-types';

export const messages = {
  [Language.En]: {
    [ErrorType.SignUp_EmailAlreadyExists]: 'Email is already registered',
  },
};
