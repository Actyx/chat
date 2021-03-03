import { Milliseconds } from '@actyx/pond';
import React, { ReactNode } from 'react';
import { MessageId } from '../../../business-logic/message/types';
import { Typography } from '../../common/Typography/Typography';
import { Message } from './Message';
import { MessageInput } from './MessageInput';
import './channel.css';
import { Header } from '../../common/FlexPanel/Header';

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
  totalUsers: number;
  editMessage: (messageId: MessageId, content: string) => void;
  hideMessage: (messageId: MessageId) => void;
  addMessage: (content: string) => void;
}>;

const Body = ({ children }: Readonly<{ children: ReactNode }>) => (
  <div className="overflow-y-auto channel-content-body">{children}</div>
);

export const Channel = ({
  channelName,
  channelDescription,
  messages,
  totalUsers,
  editMessage,
  hideMessage,
  addMessage,
}: Props) => {
  return (
    <div className="w-full overflow-y-auto	h-full">
      <div className="flex flex-col h-full">
        <Header>
          <div>
            <Typography tag="div" weight="bold" color="gray-dark">
              #{channelName}
            </Typography>
            <Typography tag="div" size="sm" color="gray-medium">
              {channelDescription}
            </Typography>
          </div>
          <Typography tag="div" size="sm" color="gray-medium">
            {totalUsers} {`user${totalUsers !== 1 ? 's' : ''}`}
          </Typography>
        </Header>
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
        <MessageInput channelName={channelName} addMessage={addMessage} />
      </div>
    </div>
  );
};
