import { Pond, Timestamp } from '@actyx/pond';
import React, { FC, useContext } from 'react';
import {
  canUserHideMessage,
  doesMessageBelongToUser,
  editMessageInChannel,
  hideMessageFromChannel as hideMessageInChannel,
  sendMessageToChannel,
} from '../../business-logic/channel-fish/logic';
import {
  ChannelFishState,
  PublicMessages,
} from '../../business-logic/channel-fish/types';
import {
  ChannelId,
  MessageId,
  PublicMessage,
} from '../../business-logic/message/types';
import {
  editUserProfile,
  getDisplayNameByUserUUID,
} from '../../business-logic/users-catalog-fish/logic';
import {
  Users,
  UsersCatalogFishState,
  UserUUID,
} from '../../business-logic/users-catalog-fish/types';
import { closeSectionRight } from '../ui-state-manager/actions';
import { SectionRight } from '../ui-state-manager/types';
import {
  DispatchContextUI,
  StateContextUI,
} from '../ui-state-manager/UIStateManager';
import { UserProfileDetails } from '../UserProfileDetails/UserProfileDetails';
import { Channel, MessagesUI } from './Channel/Channel';
import { MessageInput } from './Channel/MessageInput';
import { TopBar } from './TopBar';

type Props = Readonly<{
  pond: Pond;
  signedInUserUUID: UserUUID;
  activeChannelId: ChannelId;
  stateUsersCatalogFish: UsersCatalogFishState;
  stateChannelMainFish: ChannelFishState;
}>;

const getVisiblePublicMessages = (messages: PublicMessages) =>
  messages.filter((x) => x.isHidden === false);

const mapPublicMessagesToUI = (
  messages: PublicMessages,
  users: Users,
  signedInUserUUID: UserUUID
): MessagesUI =>
  messages.map((m: PublicMessage) => {
    const senderDisplayName =
      getDisplayNameByUserUUID(m.senderId, users) ?? 'user not found';
    const canEdit = doesMessageBelongToUser(signedInUserUUID, m);
    const canHide = canUserHideMessage(signedInUserUUID, m);
    return {
      messageId: m.messageId,
      createdOn: Timestamp.toMilliseconds(m.createdOn),
      editedOn: m.editedOn && Timestamp.toMilliseconds(m.editedOn),
      senderDisplayName,
      isHidden: m.isHidden,
      content: m.content,
      canEdit,
      canHide,
    };
  });

export const ChatContainer: FC<Props> = ({
  pond,
  signedInUserUUID,
  activeChannelId,
  stateUsersCatalogFish,
  stateChannelMainFish,
}) => {
  const dispatch = useContext(DispatchContextUI);

  const stateUI = useContext(StateContextUI);

  const [errorPond, setErrorPond] = React.useState<string>();

  const userDisplayName = getDisplayNameByUserUUID(
    signedInUserUUID,
    stateUsersCatalogFish.users
  );

  const handleEditUserProfile = async (displayName: string) => {
    try {
      const isUserProfileEdited = await editUserProfile(pond)(
        stateUsersCatalogFish.users,
        signedInUserUUID,
        displayName
      );
      if (isUserProfileEdited === true) {
        dispatch(closeSectionRight());
      }
      setErrorPond(undefined);
    } catch (err) {
      setErrorPond(err);
    }
  };

  const handleSendMessage = async (content: string) => {
    try {
      await sendMessageToChannel(pond)(activeChannelId)(signedInUserUUID)({
        content,
      });
      setErrorPond(undefined);
    } catch (err) {
      setErrorPond(err);
    }
  };

  const handleEditMessage = async (messageId: MessageId, content: string) => {
    try {
      await editMessageInChannel(pond)(activeChannelId)(
        stateChannelMainFish.messages
      )(signedInUserUUID)(messageId, content);
      setErrorPond(undefined);
    } catch (err) {
      setErrorPond(err);
    }
  };

  const handleHideMessage = async (messageId: MessageId) => {
    const hasUserConfirmed = window.confirm(
      'Are you sure to hide this message?'
    );
    if (hasUserConfirmed) {
      try {
        await hideMessageInChannel(pond)(activeChannelId)(
          stateChannelMainFish.messages
        )(signedInUserUUID)(messageId);
        setErrorPond(undefined);
      } catch (err) {
        setErrorPond(err);
      }
    }
  };

  const messagesUI = mapPublicMessagesToUI(
    getVisiblePublicMessages(stateChannelMainFish.messages),
    stateUsersCatalogFish.users,
    signedInUserUUID
  );

  const canShowUserProfileEdit =
    stateUI.sectionRight === SectionRight.UserProfileEdit;

  return (
    <div>
      {errorPond}
      <TopBar userDisplayName={userDisplayName ?? ''} />
      <div>left - main side bar here</div>
      <div>
        <Channel
          messages={messagesUI}
          editMessage={handleEditMessage}
          hideMessage={handleHideMessage}
        />
        <MessageInput sendMessage={handleSendMessage} />
      </div>
      <div>
        {canShowUserProfileEdit && (
          <UserProfileDetails editUserProfile={handleEditUserProfile} />
        )}
      </div>
    </div>
  );
};
