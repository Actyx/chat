import { usePond } from '@actyx-contrib/react-pond';
import { Milliseconds } from '@actyx/pond';
import React, { useContext, useState } from 'react';
import { mkChannelFish } from '../../../../../business-logic/channel-fish/channel-fish';
import { editMessageInChannel } from '../../../../../business-logic/channel-fish/logic/editMessageInChannel';
import { hideMessageFromChannel } from '../../../../../business-logic/channel-fish/logic/hideMessageFromChannel';
import { wire } from '../../../../../business-logic/common/logic-wire';
import { MessageId } from '../../../../../business-logic/message/types';
import { UserUUID } from '../../../../../business-logic/user-catalog-fish/types';
import { UserCatalogFish } from '../../../../../business-logic/user-catalog-fish/user-catalog-fish';
import { StateContextUI } from '../../../../state-manager/UIStateManager';
import { useFish } from '../../../../utils/use-fish';
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

  const userCatalogFishState = useFish(
    pond,
    UserCatalogFish,
    UserCatalogFish.initialState
  );

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

  const performHideMessage = wirePond(hideMessageFromChannel);

  const handleHideMessage = async (messageId: MessageId) => {
    const hasUserConfirmed = window.confirm(CONFIRM_HIDE_MESSAGE);
    if (hasUserConfirmed) {
      performHideMessage(
        userCatalogFishState.users,
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
