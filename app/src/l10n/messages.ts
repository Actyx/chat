import { Language } from './types';
import { ErrorType as ET } from '../business-logic/common/logic-types';

export const messages = {
  [Language.En]: {
    [ET.Authetication_UserIsNotSignedIn]: 'User is not signed-in',
    [ET.SignUp_EmailAlreadyExists]: 'Email is already registered',
    [ET.UserEditProfile_DisplayNameIsRequired]:
      "User's display name is required",
    [ET.UserEditProfile_UserIsNotRegistered]: 'User is not registered',
    [ET.ChannelAdd_ChannelNameExist]: 'That name is already taken by a channel',
  },
};
