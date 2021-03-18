import { Milliseconds } from '@actyx/pond';
import React, { useState } from 'react';
import { MessageId } from '../../../../business-logic/message/types';
import { UserUUID } from '../../../../business-logic/user-catalog-fish/types';
import { Typography } from '../../../common/Typography/Typography';
import { DateTime } from '../../../common/DateTime/DateTime';
import { MessageActions } from './MessageActions';
import { MessageEdit } from './MessageEdit';
import cn from 'classnames';
import { Alert } from '../../../common/Alert/Alert';

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
  pondErrorMessage?: string;
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
  hideMessage,
  pondErrorMessage,
}: MessageProps) => {
  const [isCursorHover, setIsCursorHover] = useState<boolean>(false);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const handleEditMessage = (content: string) => {
    editMessage(messageId, content);
    setIsEditMode(false);
  };

  const handleHideMessage = () => hideMessage(messageId);

  const handleEditMode = () => setIsEditMode(true);

  const handleCloseEditMode = () => setIsEditMode(false);

  const handleMouseEnter = () => setIsCursorHover(true);
  const handleMouseLeave = () => setIsCursorHover(false);

  const showMessageActions = isCursorHover && (canEdit || canHide);

  const stylesMessage = cn('relative p-4', {
    'bg-yellow-100': isEditMode,
    'hover:bg-gray-50': !isEditMode,
    'bg-white': !isEditMode,
  });

  return (
    <>
      {pondErrorMessage && (
        <div className="p-4">
          <Alert variant="danger">{pondErrorMessage}</Alert>
        </div>
      )}
      <div
        className={stylesMessage}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex space-x-3 items-center">
          <Typography tag="div" weight="bold">
            {senderDisplayName}
          </Typography>
          {!isEditMode && (
            <Typography tag="div" size="sm" color="gray-medium">
              <DateTime timestamp={editedOn ?? createdOn} />
            </Typography>
          )}
        </div>
        <Typography tag="div" color="gray-dark">
          <p className="leading-relaxed">
            {!isEditMode && content}
            {!isEditMode && editedOn && (
              <Typography size="sm" color="gray-light">
                {' '}
                (edited)
              </Typography>
            )}
          </p>
        </Typography>
        <div>
          {isEditMode && (
            <MessageEdit
              currentContent={content}
              editContent={handleEditMessage}
              close={handleCloseEditMode}
            />
          )}
        </div>
        {showMessageActions && (
          <MessageActions
            canEdit={canEdit}
            canHide={canHide}
            edit={handleEditMode}
            hide={handleHideMessage}
          />
        )}
      </div>
    </>
  );
};
