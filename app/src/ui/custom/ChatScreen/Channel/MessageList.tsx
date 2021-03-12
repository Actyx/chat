import React, { useContext, useRef } from 'react';
import { MessageId } from '../../../../business-logic/message/types';
import { StateContextUI } from '../../../state-manager/UIStateManager';
import { Message, MessageUI } from './Message';
import { useScrollIntoViewLatestMessage } from './useScrollIntoViewLatestMessage';

type MessageListProps = Readonly<{
  messages: ReadonlyArray<MessageUI>;
  editMessage: (messageId: MessageId, content: string) => void;
  hideMessage: (messageId: MessageId) => void;
}>;

const Spacer = () => <div className="w-4 h-4" />;

export const MessageList = ({
  messages,
  editMessage,
  hideMessage,
}: MessageListProps) => {
  const stateUI = useContext(StateContextUI);

  const markerElm = useRef<HTMLDivElement>(null);

  useScrollIntoViewLatestMessage(stateUI.userUUID, messages, markerElm.current);

  return (
    <>
      <Spacer />
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
