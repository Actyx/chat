import React, { useContext, useEffect } from 'react';
import { MessageId } from '../../../business-logic/message/types';
import { StateContextUI } from '../../ui-state-manager/UIStateManager';
import { scrollDomIntoView } from '../../utils/ui-dom';
import { Message, MessageUI } from './Message';

type MessageListProps = Readonly<{
  messages: ReadonlyArray<MessageUI>;
  editMessage: (messageId: MessageId, content: string) => void;
  hideMessage: (messageId: MessageId) => void;
}>;

export const MessageList = ({
  messages,
  editMessage,
  hideMessage,
}: MessageListProps) => {
  const stateUI = useContext(StateContextUI);

  useEffect(() => {
    const hasMessages = messages.length > 0;
    if (hasMessages) {
      const lastMessage = messages[messages.length - 1];
      const isLastMessageFromUser = lastMessage.createdBy === stateUI.userUUID;
      if (isLastMessageFromUser) {
        scrollDomIntoView('data-messagelist-list')('end');
      }
    }
  }, [messages, stateUI.userUUID]);

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
      <div data-messagelist-list="end" />
    </>
  );
};
