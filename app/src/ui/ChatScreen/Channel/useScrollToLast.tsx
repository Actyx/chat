import { useEffect, useState } from 'react';
import { UserUUID } from '../../../business-logic/user-catalog-fish/types';
import { MessageUI } from './Message';

export const useScrollToLast = (
  userUUID: UserUUID,
  messages: ReadonlyArray<MessageUI>,
  markerElm: Element | null
) => {
  const [isFirstRun, setIsFirstRun] = useState(true);

  let lastMessage: MessageUI | undefined;
  let wasLastMessageCreatedByUser = false;
  const messagesLen = messages.length;
  const hasMessages = messagesLen > 0;
  if (hasMessages) {
    lastMessage = messages[messagesLen - 1];
    wasLastMessageCreatedByUser = lastMessage.createdBy === userUUID;
  }

  useEffect(() => {
    if (hasMessages) {
      if (isFirstRun) {
        markerElm?.scrollIntoView();
        setIsFirstRun(false);
      } else if (wasLastMessageCreatedByUser) {
        markerElm?.scrollIntoView();
      }
    }
  }, [
    messagesLen,
    isFirstRun,
    hasMessages,
    wasLastMessageCreatedByUser,
    markerElm,
  ]);
};
