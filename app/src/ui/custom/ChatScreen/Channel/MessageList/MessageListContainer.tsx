import { usePond } from '@actyx-contrib/react-pond';
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
import { Message, MessageUI } from '../Message/Message';

type MessageListContainerProps = Readonly<{
  userUUID: UserUUID;
  activeChannelId: ChannelId;
  messages: ReadonlyArray<MessageUI>;
}>;

const CONFIRM_HIDE_MESSAGE = 'Are you sure to delete this message?';

export const MessageListContainer = ({
  userUUID,
  activeChannelId,
  messages,
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
          editMessage={handleEditMessage}
          hideMessage={handleHideMessage}
          pondErrorMessage={pondErrorMessage}
        />
      ))}
    </>
  );
};
