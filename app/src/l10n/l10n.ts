import { Language, Messages } from './types';
import { ErrorType } from '../business-logic/common/logic-types';

export const getMessage = (messages: Messages) => (language: Language) => (
  errorType: ErrorType
): string => messages[language][errorType];
