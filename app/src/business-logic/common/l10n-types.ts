import { ErrorType } from './logic-types';

export enum Language {
  En = 'En',
}

export type Messages = Record<Language, Record<ErrorType, string>>;
