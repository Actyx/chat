import { ReadonlyArrayOfOneOrMore, TagsWithEvent } from '../../common/types';

export enum ErrorCode {
  AutheticationUserIsNotSignedIn = 'AutheticationUserIsNotSignedIn',
  SignUpEmailAlreadyExists = 'SignUpEmailAlreadyExists',
  UserEditProfileDisplayNameIsRequired = 'UserEditProfileDisplayNameIsRequired',
  UserEditProfileUserIsNotRegistered = 'UserEditProfileUserIsNotRegistered',
  ChannelAddChannelNameExist = 'ChannelAddChannelNameExist',
  ChannelEditChannelNameExist = 'ChannelEditChannelNameExist',
  ChannelEditChannelProfileDoesNotExist = 'ChannelEditChannelProfileDoesNotExist',
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

export type LogicResult<E, R> = LogicResultSuccess<E, R> | LogicResultError;

export type LogicResultSuccessUI<R> = Readonly<{
  type: 'ok';
  result: R;
}>;

export type LogicResultUI<R> = LogicResultSuccessUI<R> | LogicResultError;
