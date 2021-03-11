import { Language } from '../common/l10n-types';
import { ErrorType } from '../common/logic-types';

export const messages = {
  [Language.En]: {
    [ErrorType.Authetication_UserIsNotSignedIn]: 'User is not signed-in',
    [ErrorType.SignUp_EmailAlreadyExists]: 'Email is already registered',
    [ErrorType.UserEditProfile_DisplayNameIsRequired]:
      "User's display name is required",
    [ErrorType.UserEditProfile_UserIsNotRegistered]: 'User is not registered',
  },
};
