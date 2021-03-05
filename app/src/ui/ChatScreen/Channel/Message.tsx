import { Milliseconds } from '@actyx/pond';
import React, { useState } from 'react';
import { MessageId } from '../../../business-logic/message/types';
import { UserUUID } from '../../../business-logic/user-catalog-fish/types';
import { Typography } from '../../common/Typography/Typography';
import { DateTime } from '../../DateTime/DateTime';
import { MessageActions } from './MessageActions';
import { MessageEdit } from './MessageEdit';

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
  const [isCursorHover, setIsCursorHover] = useState<boolean>(false);
  const [showEditMode, setShowEditMode] = useState<boolean>(false);

  const handleEditMessage = (content: string) =>
    editMessage(messageId, content);

  const handleHideMessage = () => hideMesage(messageId);

  const handleEditMode = () => {
    setShowEditMode(true);
  };

  const handleMouseEnter = () => setIsCursorHover(true);
  const handleMouseLeave = () => setIsCursorHover(false);

  const showActions = isCursorHover && (canEdit || canHide);

  return (
    <div
      className="relative p-4 hover:bg-gray-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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
        {showEditMode && <MessageEdit editContent={handleEditMessage} />}
      </div>
      {showActions && (
        <MessageActions
          canEdit={canEdit}
          canHide={canHide}
          edit={handleEditMode}
          hide={handleHideMessage}
        />
      )}
    </div>
  );
};
