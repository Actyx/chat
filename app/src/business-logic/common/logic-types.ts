import { ReadonlyArrayOfOneOrMore, TagsWithEvent } from '../../common/types';

export enum ErrorType {
  Authetication_UserIsNotSignedIn = 'Authetication_UserIsNotSignedIn',
  SignUp_EmailAlreadyExists = 'SignUp_EmailAlreadyExists',
  UserEditProfile_DisplayNameIsRequired = 'UserEditProfile_DisplayNameIsRequired',
  UserEditProfile_UserIsNotRegistered = 'UserEditProfile_UserIsNotRegistered',
}

export type LogicResultSuccess<T> = Readonly<{
  status: 'ok';
  tagsWithEvents: ReadonlyArrayOfOneOrMore<TagsWithEvent<T>>;
}>;

export type LogicResultError = Readonly<{
  status: 'error';
  errorType: ErrorType;
  errorMessage: string;
}>;

export type LogicResult<T> = LogicResultSuccess<T> | LogicResultError;
