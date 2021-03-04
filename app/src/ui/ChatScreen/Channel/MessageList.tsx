import React, { useContext, useEffect, useRef, useState } from 'react';
import { MessageId } from '../../../business-logic/message/types';
import { StateContextUI } from '../../ui-state-manager/UIStateManager';
import { scrollDomIntoView } from '../../utils/ui-dom';
import { Message, MessageUI } from './Message';

type MessageListProps = Readonly<{
  messages: ReadonlyArray<MessageUI>;
  editMessage: (messageId: MessageId, content: string) => void;
  hideMessage: (messageId: MessageId) => void;
}>;

const scrollListTo = scrollDomIntoView('data-messagelist-list');

export const MessageList = ({
  messages,
  editMessage,
  hideMessage,
}: MessageListProps) => {
  const stateUI = useContext(StateContextUI);

  let lastMessage: MessageUI | undefined;
  let isLastMessageFromUser = false;
  const hasMessages = messages.length > 0;
  if (hasMessages) {
    lastMessage = messages[messages.length - 1];
    isLastMessageFromUser = lastMessage.createdBy === stateUI.userUUID;
  }

  useEffect(() => {
    if (isLastMessageFromUser) {
      console.log('lastMessage from user');
      scrollListTo('end');
    }
  }, [messages.length, isLastMessageFromUser]);

  const [isFirstRun, setIsFirstRun] = useState(true);
  useEffect(() => {
    if (isFirstRun) {
      console.log('scroll first time');
      scrollListTo('end');
      setIsFirstRun(false);
    }
  }, [isFirstRun]);

  return (
    <>
      {messages.map((m: MessageUI) => (
        <Message
          key={m.messageId}
          messageId={m.messageId}
          createdBy={m.createdBy}
          createdOn={m.createdOn}
          editedOn={m.editedOn}
          senderDisplayName={m.senderDisplayName}
          isHidden={m.isHidden}
          content={m.content}
          canEdit={m.canEdit}
          canHide={m.canHide}
          editMessage={editMessage}
          hideMessage={hideMessage}
        />
      ))}
      <div className="w-4 h-4 bg-red-400" data-messagelist-list="end" />
    </>
  );
};
