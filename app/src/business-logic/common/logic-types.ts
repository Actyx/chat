import { ReadonlyArrayOfOneOrMore, TagsWithEvent } from '../../common/types';

export enum ErrorCode {
  AutheticationUserIsNotSignedIn = 'AutheticationUserIsNotSignedIn',
  SignUpEmailAlreadyExists = 'SignUpEmailAlreadyExists',
  UserEditProfileDisplayNameIsRequired = 'UserEditProfileDisplayNameIsRequired',
  UserEditProfileUserIsNotRegistered = 'UserEditProfileUserIsNotRegistered',
  ChannelUserIsNotOwner = 'ChannelUserIsNotOwner',
  ChannelNameExist = 'ChannelNameExist',
  ChannelDoesNotExist = 'ChannelDoesNotExist',
  ChannelUserIsNotAssociated = 'ChannelUserIsNotAssociated',
  ChannelUserIsAssociated = 'ChannelUserIsAssociated',
  ChannelDefaultAlredyExist = 'ChannelDefaultAlredyExist',
  MessageDoesNotExist = 'MessageDoesNotExist',
  MessageUserIsNotOwner = 'MessageUserIsNotOwner',
}

export type LogicResultSuccess<E, R> = Readonly<{
  type: 'ok';
  tagsWithEvents: ReadonlyArrayOfOneOrMore<TagsWithEvent<E>>;
  result: R;
}>;

export type LogicResultError = Readonly<{
  type: 'error';
  code: ErrorCode;
  message: string;
}>;

export type LogicResult<E, R = void> =
  | LogicResultSuccess<E, R>
  | LogicResultError;

export type LogicResultSuccessUI<R> = Readonly<{
  type: 'ok';
  result: R;
}>;

export type LogicResultUI<R = void> =
  | LogicResultSuccessUI<R>
  | LogicResultError;
