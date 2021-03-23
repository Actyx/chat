import { usePond } from '@actyx-contrib/react-pond';
import { Milliseconds } from '@actyx/pond';
import React, { useState } from 'react';
import { mkChannelFish } from '../../../../../business-logic/channel-fish/channel-fish';
import { editMessageInChannel } from '../../../../../business-logic/channel-fish/logic/editMessageInChannel';
import { hideMessageFromChannel } from '../../../../../business-logic/channel-fish/logic/hideMessageFromChannel';
import { wire } from '../../../../../business-logic/common/logic-wire';
import {
  ChannelId,
  MessageId,
} from '../../../../../business-logic/message/types';
import { UserUUID } from '../../../../../business-logic/user-catalog-fish/types';
import { UserCatalogFish } from '../../../../../business-logic/user-catalog-fish/user-catalog-fish';
import { useFish } from '../../../../utils/use-fish';
import { Message } from '../Message';

type MessageListContainerProps = Readonly<{
  activeChannelId: ChannelId;
  userUUID: UserUUID;
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
  activeChannelId,
  userUUID,
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

  const userCatalogFishState = useFish(
    pond,
    UserCatalogFish,
    UserCatalogFish.initialState
  );

  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const wirePond = wire(pond, mkChannelFish(activeChannelId));

  const performEditMessage = wirePond(editMessageInChannel);

  const handleEditMessage = async (messageId: MessageId, content: string) => {
    performEditMessage(
      userCatalogFishState.users,
      activeChannelId,
      userUUID,
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
        activeChannelId,
        userUUID,
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
