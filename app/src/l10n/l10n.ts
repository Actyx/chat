import { Language, Messages } from './types';
import { ErrorCode } from '../business-logic/common/logic-types';
import { messages } from './messages';

const getMessage = (messages: Messages) => (language: Language) => (
  errorCode: ErrorCode
): string => messages[language][errorCode];

export const getUIMessage = getMessage(messages)(Language.En);
