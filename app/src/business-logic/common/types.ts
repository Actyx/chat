import { TagsWithEvent } from '../../common/types';
import { UserCatalogFishEvent, UserUUID } from '../user-catalog-fish/types';

export enum ErrorType {
  SignUp_EmailAlreadyExists = 'SignUp_EmailAlreadyExists',
}

export type LogicResultSuccess<T, O = void> = Readonly<{
  status: 'ok';
  tagsWithEvents: ReadonlyArray<TagsWithEvent<T>>;
  others?: O;
}>;

export type LogicResultError = Readonly<{
  status: 'error';
  errorType: ErrorType;
  errorMessage: string;
}>;

export type LogicResult<T, O = void> =
  | LogicResultSuccess<T, O>
  | LogicResultError;

// RESULTS
export type SignUpResult = LogicResult<
  UserCatalogFishEvent,
  Readonly<{
    userUUID: UserUUID;
  }>
>;
