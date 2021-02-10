import { Milliseconds } from '@actyx/pond';
import React, { FC, useState } from 'react';
import { MessageId } from '../../../business-logic/message/types';

export type MessageUI = Readonly<{
  messageId: string;
  createdOn: Milliseconds;
  editedOn?: Milliseconds;
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
  createdOn,
  editedOn,
  senderDisplayName,
  isHidden,
  content,
  canEdit,
  editMessage,
}) => {
  const handleEditContent = (content: string) =>
    editMessage(messageId, content);

  return (
    <div>
      {editedOn && (
        <div>
          <i>EDITED</i>
        </div>
      )}
      messageId: {messageId}
      <br />
      timestamp: {editedOn ?? createdOn}
      <br />
      senderDisplayName: {senderDisplayName}
      <br />
      isHidden: {isHidden ? 'true' : 'false'}
      <br />
      content: {content}
      <br />
      {canEdit && <EditMessage editContent={handleEditContent} />}
      <hr />
    </div>
  );
};

const EditMessage = ({
  editContent,
}: Readonly<{
  editContent: (content: string) => void;
}>) => {
  const [content, setContent] = useState<string>('');

  const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    editContent(content);
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Edit:</label>
      <input
        type="text"
        required
        value={content}
        onChange={handleChangeContent}
      />
      <input type="submit" value="Edit message" />
    </form>
  );
};
