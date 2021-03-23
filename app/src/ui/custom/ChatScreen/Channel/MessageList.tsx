import React, { useRef } from 'react';
import { ChannelId } from '../../../../business-logic/message/types';
import { UserUUID } from '../../../../business-logic/user-catalog-fish/types';
import { MessageUI } from './Message';
import { MessageListContainer } from './Message/MessageContainer';
import { useScrollIntoViewLatestMessage } from './useScrollIntoViewLatestMessage';

type MessageListProps = Readonly<{
  userUUID: UserUUID;
  activeChannelId: ChannelId;
  messages: ReadonlyArray<MessageUI>;
}>;

const Spacer = () => <div className="w-4 h-4" />;

export const MessageList = ({
  userUUID,
  activeChannelId,
  messages,
}: MessageListProps) => {
  const markerElm = useRef<HTMLDivElement>(null);

  useScrollIntoViewLatestMessage(userUUID, messages, markerElm.current);

  return (
    <>
      <Spacer />
      {messages.map((m: MessageUI) => (
        <MessageListContainer
          activeChannelId={activeChannelId}
          userUUID={userUUID}
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
        />
      ))}
      <div ref={markerElm} />
    </>
  );
};
