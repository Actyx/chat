import { Language, Messages } from './types';
import { ErrorCode } from '../business-logic/common/logic-types';

export const getMessage = (messages: Messages) => (language: Language) => (
  errorCode: ErrorCode
): string => messages[language][errorCode];
