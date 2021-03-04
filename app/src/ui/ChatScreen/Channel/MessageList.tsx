import React, { useContext, useRef } from 'react';
import { MessageId } from '../../../business-logic/message/types';
import { StateContextUI } from '../../ui-state-manager/UIStateManager';
import { Message, MessageUI } from './Message';
import { useScrollToLast } from './useScrollToLast';

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

  const markerElm = useRef<HTMLDivElement>(null);

  useScrollToLast(stateUI.userUUID, messages, markerElm.current);

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
      <div ref={markerElm} />
    </>
  );
};
