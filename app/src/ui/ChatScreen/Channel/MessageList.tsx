import React from 'react';
import { MessageId } from '../../../business-logic/message/types';
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
  return (
    <>
      {messages.map((m: MessageUI) => (
        <Message
          key={m.messageId}
          messageId={m.messageId}
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
    </>
  );
};
