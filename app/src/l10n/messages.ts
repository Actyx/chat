import { Language } from './types';
import { ErrorCode as Code } from '../business-logic/common/logic-types';

export const messages = {
  [Language.En]: {
    [Code.AutheticationUserIsNotSignedIn]: 'User is not signed-in',
    [Code.SignUpEmailAlreadyExists]: 'Email is already registered',
    [Code.UserEditProfileDisplayNameIsRequired]:
      "User's display name is required",
    [Code.UserEditProfileUserIsNotRegistered]: 'User is not registered',
    [Code.ChannelAddChannelNameExist]:
      'That name is already taken by a channel',
    [Code.ChannelEditChannelNameExist]:
      'That name is already taken by a channel',
    [Code.ChannelEditChannelProfileDoesNotExist]:
      'Cannot edit profile because it does not exist',
    [Code.ChannelUserIsNotOwner]: 'User does not own this channel',
    [Code.ChannelDoesNotExist]: 'Channel does not exist',
  },
};
