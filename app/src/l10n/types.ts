import { ErrorCode } from '../business-logic/common/logic-types';

export enum Language {
  En = 'En',
}

export type Messages = Record<Language, Record<ErrorCode, string>>;
