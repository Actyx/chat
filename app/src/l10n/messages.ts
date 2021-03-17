import { Language } from './types';
import { ErrorCode as Ec } from '../business-logic/common/logic-types';

export const messages = {
  [Language.En]: {
    [Ec.AutheticationUserIsNotSignedIn]: 'User is not signed-in',
    [Ec.SignUpEmailAlreadyExists]: 'Email is already registered',
    [Ec.UserEditProfileDisplayNameIsRequired]:
      "User's display name is required",
    [Ec.UserEditProfileUserIsNotRegistered]: 'User is not registered',
    [Ec.ChannelUserIsNotOwner]: 'User does not own this channel',
    [Ec.ChannelNameExist]: 'That name is already taken by a channel',
    [Ec.ChannelDoesNotExist]: 'Channel does not exist',
    [Ec.ChannelUserIsNotAssociated]: 'User is not associated to channel',
    [Ec.ChannelUserIsAssociated]: 'User is associated to channel',
    [Ec.ChannelDefaultAlredyExist]: 'Default channel already exist',
    [Ec.MessageDoesNotExist]: 'Message does not exist',
    [Ec.MessageUserIsNotOwner]: 'User is tno the owner of the message',
  },
};
