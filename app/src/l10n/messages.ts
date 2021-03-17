import { Language } from './types';
import { ErrorCode as Code } from '../business-logic/common/logic-types';

export const messages = {
  [Language.En]: {
    [Code.AutheticationUserIsNotSignedIn]: 'User is not signed-in',
    [Code.SignUpEmailAlreadyExists]: 'Email is already registered',
    [Code.UserEditProfileDisplayNameIsRequired]:
      "User's display name is required",
    [Code.UserEditProfileUserIsNotRegistered]: 'User is not registered',
    [Code.ChannelEditChannelProfileDoesNotExist]:
      'Cannot edit profile because it does not exist',
    [Code.ChannelUserIsNotOwner]: 'User does not own this channel',
    [Code.ChannelNameExist]: 'That name is already taken by a channel',
    [Code.ChannelDoesNotExist]: 'Channel does not exist',
    [Code.ChannelUserIsNotAssociated]: 'User is not associated channel',
  },
};
