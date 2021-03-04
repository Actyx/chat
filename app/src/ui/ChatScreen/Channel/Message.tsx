import { Milliseconds } from '@actyx/pond';
import React, { useState } from 'react';
import { MessageId } from '../../../business-logic/message/types';
import { UserUUID } from '../../../business-logic/user-catalog-fish/types';
import { Typography } from '../../common/Typography/Typography';
import { DateTime } from '../../DateTime/DateTime';
import { FormEventElement, InputChangeEvent } from '../../utils/ui-event-types';

export type MessageUI = Readonly<{
  messageId: string;
  createdBy: UserUUID;
  createdOn: Milliseconds;
  editedOn?: Milliseconds;
  senderDisplayName: string;
  isHidden: boolean;
  content: string;
  canEdit: boolean;
  canHide: boolean;
}>;

type MessageProps = MessageUI &
  Readonly<{
    editMessage: (messageId: MessageId, content: string) => void;
    hideMessage: (messageId: MessageId) => void;
  }>;

export const Message = ({
  messageId,
  createdOn,
  editedOn,
  senderDisplayName,
  isHidden,
  content,
  canEdit,
  canHide,
  editMessage,
  hideMessage: hideMesage,
}: MessageProps) => {
  const handleEditMessage = (content: string) =>
    editMessage(messageId, content);

  const handleHideMessage = () => hideMesage(messageId);

  return (
    <div className="p-4 hover:bg-gray-50">
      <div className="flex space-x-3 items-center">
        <Typography tag="div" weight="bold">
          {senderDisplayName}
        </Typography>
        <Typography tag="div" size="sm" color="gray-medium">
          <DateTime timestamp={editedOn ?? createdOn} />
        </Typography>
      </div>
      <Typography tag="div" color="gray-dark">
        <p className="leading-relaxed">
          {content}
          {editedOn && (
            <Typography size="sm" color="gray-light">
              {' '}
              (edited)
            </Typography>
          )}
        </p>
      </Typography>
      <div>
        {canEdit && <EditMessage editContent={handleEditMessage} />}
        {canHide && <button onClick={handleHideMessage}>Hide</button>}
      </div>
    </div>
  );
};

const EditMessage = ({
  editContent,
}: Readonly<{
  editContent: (content: string) => void;
}>) => {
  const [content, setContent] = useState<string>('');

  const handleChangeContent = (e: InputChangeEvent) =>
    setContent(e.target.value);

  const handleSubmit = (e: FormEventElement) => {
    editContent(content);
    setContent('');
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
