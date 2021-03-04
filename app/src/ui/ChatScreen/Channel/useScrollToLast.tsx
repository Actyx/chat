import { useEffect, useState } from 'react';
import { UserUUID } from '../../../business-logic/user-catalog-fish/types';
import { MessageUI } from './Message';

/**
 * Scroll completely down the messages list for a channel so a user can see the latest message. Rules:
 * 1. If a signed-in user enters for the first time a channel => scroll to the latest message
 * 2. If a signed-in user enter a message in a channel => scroll to the latest message
 * 3. If a non-signed-in user add a message to the same channel of the sign-in user => do not scroll to the latest message,
 * so we prevent a scroll for example when a sign-in user is reading an old message in the channel
 * @param userUUID Current signed-in user
 * @param messages Messages displayed in the channel
 * @param markerElm Target DOM element which we use as a target for a scrollIntoView() operation, this element is placed
 * after the last message in the channel
 */
export const useScrollIntoViewMessage = (
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
