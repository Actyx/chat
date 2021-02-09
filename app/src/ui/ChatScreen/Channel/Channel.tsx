import React, { FC } from 'react';
import { Milliseconds } from '../../../common/utility-types';

type MessageUI = Readonly<{
  messageId: string;
  timestamp: Milliseconds;
  senderDisplayName: string;
  isHidden: boolean;
  content: string;
}>;

export type MessagesUI = ReadonlyArray<MessageUI>;

type Props = Readonly<{
  messages: ReadonlyArray<MessageUI>;
}>;

export const Channel: FC<Props> = ({ messages }) => {
  return (
    <div>
      <h2>Channel all message here:</h2>
      {messages.map((message) => (
        <div key={message.messageId}>
          messageId: {message.messageId}
          <br />
          timestamp: {message.timestamp}
          <br />
          senderDisplayName: {message.senderDisplayName}
          <br />
          isHidden: {message.isHidden}
          <br />
          content: {message.content}
          <br />
          <hr />
        </div>
      ))}
    </div>
  );
};
