import { Pond, Timestamp } from '@actyx/pond';
import React, { FC, useContext, useEffect, useState } from 'react';
import {
  initialStateCannelFish,
  mainChannelFish,
} from '../../business-logic/channel-fish/channel-fish';
import {
  canUserHideMessage,
  doesMessageBelongToUser,
  editMessageInChannel,
  hideMessageFromChannel,
  addMessageToChannel,
} from '../../business-logic/channel-fish/logic';
import {
  ChannelFishState,
  PublicMessages,
} from '../../business-logic/channel-fish/types';
import { MessageId, PublicMessage } from '../../business-logic/message/types';
import {
  editUserProfile,
  getDisplayNameByUserUUID,
} from '../../business-logic/users-catalog-fish/logic';
import {
  Users,
  UsersCatalogFishState,
  UserUUID,
} from '../../business-logic/users-catalog-fish/types';
import {
  initialStateUserCatalogFish,
  UsersCatalogFish,
} from '../../business-logic/users-catalog-fish/users-catalog-fish';
import { closeSectionRight } from '../ui-state-manager/actions';
import { SectionCenter, SectionRight } from '../ui-state-manager/types';
import {
  DispatchContextUI,
  StateContextUI,
} from '../ui-state-manager/UIStateManager';
import { UserProfileDetails } from '../UserProfileDetails/UserProfileDetails';
import { AddChannelDialog } from './AddChannelDialogContainer';
import { Channel, MessagesUI } from './Channel/Channel';
import { MessageInput } from './Channel/MessageInput';
import { Sidebar } from './Sidebar/Sidebar';
import { TopBar } from './TopBar';

type Props = Readonly<{
  pond: Pond;
  signedInUserUUID: UserUUID;
}>;

const getVisiblePublicMessages = (messages: PublicMessages) =>
  messages.filter((m) => m.isHidden === false);

const mapPublicMessagesToUI = (
  messages: PublicMessages,
  users: Users,
  signedInUserUUID: UserUUID
): MessagesUI =>
  messages.map((m: PublicMessage) => {
    const senderDisplayName =
      getDisplayNameByUserUUID(m.userUUID, users) ?? 'user not found';
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

export const ChatContainer: FC<Props> = ({ pond, signedInUserUUID }) => {
  const dispatch = useContext(DispatchContextUI);

  const stateUI = useContext(StateContextUI);

  const [
    stateUsersCatalogFish,
    setStateUsersCatalogFish,
  ] = useState<UsersCatalogFishState>(initialStateUserCatalogFish);

  const [
    stateChannelMainFish,
    setStateChannelMainFish,
  ] = useState<ChannelFishState>(initialStateCannelFish);

  useEffect(() => {
    const cancelSubUserCatalogFish = pond.observe(
      UsersCatalogFish.fish,
      setStateUsersCatalogFish
    );

    const cancelSubscChannelFish = pond.observe(
      mainChannelFish,
      setStateChannelMainFish
    );
    return () => {
      cancelSubUserCatalogFish();
      cancelSubscChannelFish();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [errorPond, setErrorPond] = useState<string>();

  const handleEditUserProfile = async (displayName: string) => {
    try {
      const isUserProfileEdited = await editUserProfile(pond)(
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

  const handleAddMessage = async (content: string) => {
    try {
      await addMessageToChannel(pond)(
        stateUI.activeChannelId,
        signedInUserUUID
      )({
        content,
      });
      setErrorPond(undefined);
    } catch (err) {
      setErrorPond(err);
    }
  };

  const handleEditMessage = async (messageId: MessageId, content: string) => {
    try {
      await editMessageInChannel(pond)(
        stateUI.activeChannelId,
        signedInUserUUID
      )(messageId, content);
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
        await hideMessageFromChannel(pond)(
          stateUI.activeChannelId,
          signedInUserUUID
        )(messageId);
        setErrorPond(undefined);
      } catch (err) {
        setErrorPond(err);
      }
    }
  };

  const handleOpenAddChannelDialog = () => {
    setOpenAddChannelDialog(true);
  };

  const handleCloseAddChannelDialog = () => setOpenAddChannelDialog(false);

  const [openAddChannelDialog, setOpenAddChannelDialog] = useState<boolean>(
    false
  );

  const messagesUI = mapPublicMessagesToUI(
    getVisiblePublicMessages(stateChannelMainFish.messages),
    stateUsersCatalogFish?.users,
    signedInUserUUID
  );

  const userDisplayName = getDisplayNameByUserUUID(
    signedInUserUUID,
    stateUsersCatalogFish.users
  );

  const canShowUserProfileEdit =
    stateUI.sectionRight === SectionRight.UserProfileEdit;

  const renderSectionCenter = () => {
    switch (stateUI.sectionCenter) {
      case SectionCenter.Channel:
        return (
          <div>
            <Channel
              messages={messagesUI}
              editMessage={handleEditMessage}
              hideMessage={handleHideMessage}
            />
            <MessageInput addMessage={handleAddMessage} />
          </div>
        );
      case SectionCenter.ChannelsCatalog:
        return (
          <div>
            <h2>Channels Catalog</h2>
            All channels here
          </div>
        );
    }
  };

  return (
    <div>
      {errorPond}
      <TopBar userDisplayName={userDisplayName ?? ''} />
      <div>
        <Sidebar openAddChannelDialog={handleOpenAddChannelDialog} />
      </div>
      {renderSectionCenter()}
      <div>
        {canShowUserProfileEdit && (
          <UserProfileDetails editUserProfile={handleEditUserProfile} />
        )}
      </div>
      {openAddChannelDialog && (
        <AddChannelDialog
          pond={pond}
          signedInUserUUID={signedInUserUUID}
          closeDialog={handleCloseAddChannelDialog}
        />
      )}
    </div>
  );
};
