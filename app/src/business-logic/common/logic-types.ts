import { TagsWithEvent } from '../../common/types';

export enum ErrorType {
  SignUp_EmailAlreadyExists = 'SignUp_EmailAlreadyExists',
}

export type LogicResultSuccess<T> = Readonly<{
  status: 'ok';
  tagsWithEvents: readonly [TagsWithEvent<T>];
}>;

export type LogicResultError = Readonly<{
  status: 'error';
  errorType: ErrorType;
  errorMessage: string;
}>;

export type LogicResult<T> = LogicResultSuccess<T> | LogicResultError;
