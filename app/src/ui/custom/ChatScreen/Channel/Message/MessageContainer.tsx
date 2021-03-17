import { usePond } from '@actyx-contrib/react-pond';
import { Milliseconds } from '@actyx/pond';
import React, { useContext, useState } from 'react';
import { mkChannelFish } from '../../../../../business-logic/channel-fish/channel-fish';
import { editMessageInChannel } from '../../../../../business-logic/channel-fish/logic/editMessageInChannel';
import { hideMessageFromChannelLogic } from '../../../../../business-logic/channel-fish/logic/hideMessageFromChannel';
import { wire } from '../../../../../business-logic/common/logic-helpers';
import { MessageId } from '../../../../../business-logic/message/types';
import { UserUUID } from '../../../../../business-logic/user-catalog-fish/types';
import { StateContextUI } from '../../../../state-manager/UIStateManager';
import { Message } from '../Message';

type MessageListContainerProps = Readonly<{
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

const CONFIRM_HIDE_MESSAGE = 'Are you sure to delete this message?';

export const MessageListContainer = ({
  messageId,
  createdBy,
  createdOn,
  editedOn,
  senderDisplayName,
  isHidden,
  content,
  canEdit,
  canHide,
}: MessageListContainerProps) => {
  const pond = usePond();

  const stateUI = useContext(StateContextUI);

  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const wirePond = wire(pond, mkChannelFish(stateUI.activeChannelId));

  const performEditMessage = wirePond(editMessageInChannel);

  const handleEditMessage = async (messageId: MessageId, content: string) => {
    performEditMessage(
      stateUI.activeChannelId,
      stateUI.userUUID,
      messageId,
      content
    ).catch(setPondErrorMessage);
  };

  const performHideMessage = wirePond(hideMessageFromChannelLogic);

  const handleHideMessage = async (messageId: MessageId) => {
    const hasUserConfirmed = window.confirm(CONFIRM_HIDE_MESSAGE);
    if (hasUserConfirmed) {
      performHideMessage(
        stateUI.activeChannelId,
        stateUI.userUUID,
        messageId
      ).catch(setPondErrorMessage);
    }
  };
  return (
    <Message
      key={messageId}
      messageId={messageId}
      createdBy={createdBy}
      createdOn={createdOn}
      editedOn={editedOn}
      senderDisplayName={senderDisplayName}
      isHidden={isHidden}
      content={content}
      canEdit={canEdit}
      canHide={canHide}
      editMessage={handleEditMessage}
      hideMessage={handleHideMessage}
      pondErrorMessage={pondErrorMessage}
    />
  );
};
