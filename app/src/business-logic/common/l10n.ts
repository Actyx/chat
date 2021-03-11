import { Language, Messages } from './l10n-types';
import { ErrorType } from './logic-types';

export const getMessage = (messages: Messages) => (language: Language) => (
  errorType: ErrorType
): string => messages[language][errorType];
