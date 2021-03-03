import { Milliseconds } from '@actyx/pond';
import React, { ReactNode } from 'react';
import { MessageId } from '../../../business-logic/message/types';
import { Typography } from '../../common/Typography/Typography';
import { Message } from './Message';
import { MessageInput } from './MessageInput';

type MessageUI = Readonly<{
  messageId: string;
  createdOn: Milliseconds;
  editedOn?: Milliseconds;
  senderDisplayName: string;
  isHidden: boolean;
  content: string;
  canEdit: boolean;
  canHide: boolean;
}>;

export type MessagesUI = ReadonlyArray<MessageUI>;

type Props = Readonly<{
  channelName: string;
  channelDescription: string;
  messages: ReadonlyArray<MessageUI>;
  editMessage: (messageId: MessageId, content: string) => void;
  hideMessage: (messageId: MessageId) => void;
  addMessage: (content: string) => void;
}>;

const Header = ({ children }: Readonly<{ children: ReactNode }>) => (
  <div className="flex items-center justify-between p-4 border-b">
    {children}
  </div>
);

const Body = ({ children }: Readonly<{ children: ReactNode }>) => (
  <div>{children}</div>
);

export const Channel = ({
  channelName,
  channelDescription,
  messages,
  editMessage,
  hideMessage,
  addMessage,
}: Props) => {
  return (
    <div data-test="channel" style={{}}>
      <div style={{}}>
        <Header>
          <Typography tag="div" weight="bold" color="gray-dark">
            {channelName} x {channelDescription}
          </Typography>
        </Header>
      </div>
      <div style={{}}>
        <Body>
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
        </Body>
      </div>
      <div style={{}}>
        <MessageInput addMessage={addMessage} />
      </div>
    </div>
  );
};
