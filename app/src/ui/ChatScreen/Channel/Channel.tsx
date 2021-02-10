import { Milliseconds } from '@actyx/pond';
import React, { FC } from 'react';
import { MessageId } from '../../../business-logic/message/types';
import { Message } from './Message';

type MessageUI = Readonly<{
  messageId: string;
  createdOn: Milliseconds;
  editedOn?: Milliseconds;
  senderDisplayName: string;
  isHidden: boolean;
  content: string;
  canEdit: boolean;
}>;

export type MessagesUI = ReadonlyArray<MessageUI>;

type Props = Readonly<{
  messages: ReadonlyArray<MessageUI>;
  editMessage: (messageId: MessageId, content: string) => void;
}>;

export const Channel: FC<Props> = ({ messages, editMessage }) => {
  return (
    <div>
      <h2>Channel all message here:</h2>
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
          editMessage={editMessage}
        />
      ))}
    </div>
  );
};
