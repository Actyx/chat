import React, { FC } from 'react';
import { MessageId } from '../../../business-logic/message/types';
import { Milliseconds } from '../../../common/utility-types';

export type MessageUI = Readonly<{
  messageId: string;
  timestamp: Milliseconds;
  senderDisplayName: string;
  isHidden: boolean;
  content: string;
  canEdit: boolean;
}>;

type Props = MessageUI &
  Readonly<{
    editMessage: (messageId: MessageId, content: string) => void;
  }>;

export const Message: FC<Props> = ({
  messageId,
  timestamp,
  senderDisplayName,
  isHidden,
  content,
  canEdit,
  editMessage,
}) => {
  const handleEditMessage = () => editMessage(messageId, content);

  return (
    <div key={messageId}>
      messageId: {messageId}
      <br />
      timestamp: {timestamp}
      <br />
      senderDisplayName: {senderDisplayName}
      <br />
      isHidden: {isHidden ? 'true' : 'false'}
      <br />
      content: {content}
      <br />
      {canEdit && (
        <button type="button" onClick={handleEditMessage}>
          Edit message
        </button>
      )}
      <hr />
    </div>
  );
};
