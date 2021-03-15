import React, { useContext, useRef } from 'react';
import { StateContextUI } from '../../../state-manager/UIStateManager';
import { MessageUI } from './Message';
import { MessageListContainer } from './Message/MessageContainer';
import { useScrollIntoViewLatestMessage } from './useScrollIntoViewLatestMessage';

type MessageListProps = Readonly<{
  messages: ReadonlyArray<MessageUI>;
}>;

const Spacer = () => <div className="w-4 h-4" />;

export const MessageList = ({ messages }: MessageListProps) => {
  const stateUI = useContext(StateContextUI);

  const markerElm = useRef<HTMLDivElement>(null);

  useScrollIntoViewLatestMessage(stateUI.userUUID, messages, markerElm.current);

  return (
    <>
      <Spacer />
      {messages.map((m: MessageUI) => (
        <MessageListContainer
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
