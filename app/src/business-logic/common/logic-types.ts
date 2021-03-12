import { ReadonlyArrayOfOneOrMore, TagsWithEvent } from '../../common/types';

export enum ErrorCode {
  AutheticationUserIsNotSignedIn = 'AutheticationUserIsNotSignedIn',
  SignUpEmailAlreadyExists = 'SignUpEmailAlreadyExists',
  UserEditProfileDisplayNameIsRequired = 'UserEditProfileDisplayNameIsRequired',
  UserEditProfileUserIsNotRegistered = 'UserEditProfileUserIsNotRegistered',
  ChannelAddChannelNameExist = 'ChannelAddChannelNameExist',
}

export type LogicResultSuccess<T> = Readonly<{
  type: 'ok';
  tagsWithEvents: ReadonlyArrayOfOneOrMore<TagsWithEvent<T>>;
}>;

export type LogicResultError = Readonly<{
  type: 'error';
  code: ErrorCode;
  message: string;
}>;

export type LogicResult<T> = LogicResultSuccess<T> | LogicResultError;
