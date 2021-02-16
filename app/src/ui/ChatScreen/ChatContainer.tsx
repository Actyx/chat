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
import {
  ChannelsCatalogFish,
  initialStateChannelsCatalogFish,
} from '../../business-logic/channels-catalog-fish/channels-catalog-fish';
import {
  addChannel,
  isUserAssociatedToChannel,
} from '../../business-logic/channels-catalog-fish/logic';
import {
  Channels,
  ChannelsCatalogFishState,
} from '../../business-logic/channels-catalog-fish/types';
import {
  ChannelId,
  MessageId,
  PublicMessage,
} from '../../business-logic/message/types';
import {
  editUserProfile,
  getDisplayNameByUserUUID as getDisplayNameByUser,
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
import { AddChannelDialog } from './AddChannelDialog/AddChannelDialog';
import { Channel, MessagesUI } from './Channel/Channel';
import { MessageInput } from './Channel/MessageInput';
import {
  ChannelsCatalog,
  ChannelsOverview,
} from './ChannelsCatalog/ChannelsCatalog';
import { EditChannelDialogContainer } from './EditChannelDialog/EditChannelDialog';
import { ChannelsSimpleList, Sidebar } from './Sidebar/Sidebar';
import { TopBar } from './TopBar';

type Props = Readonly<{
  pond: Pond;
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
      getDisplayNameByUser(m.userUUID, users) ?? 'user not found';
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

const mapChannelsToSidebarUI = (channels: Channels): ChannelsSimpleList => {
  return Object.values(channels).map((x) => ({
    channelId: x.profile.channelId,
    name: x.profile.name,
  }));
};

const mapChannelsToChannelCatalogUI = (
  channels: Channels,
  users: Users,
  userUUID: UserUUID
): ChannelsOverview =>
  Object.values(channels).map((channel) => {
    const createdBy = getDisplayNameByUser(channel.profile.createdBy, users);
    const editedBy =
      channel.profile.editedBy &&
      getDisplayNameByUser(channel.profile.editedBy, users);
    const usersAssociatedTotal = channel.users.length;
    const isSignedInUserAssociated = isUserAssociatedToChannel(
      userUUID,
      channel.profile.channelId,
      channels
    );

    return {
      ...channel.profile,
      createdBy,
      editedBy,
      usersAssociatedTotal,
      isSignedInUserAssociated,
    };
  });

export const ChatContainer: FC<Props> = ({ pond }) => {
  const dispatch = useContext(DispatchContextUI);

  const stateUI = useContext(StateContextUI);

  const [openAddChannelDialog, setOpenAddChannelDialog] = useState<boolean>(
    false
  );

  const [openEditChannelDialog, setOpenEditChannelDialog] = useState<boolean>(
    false
  );

  const [messageInvalid, setMessageInvalid] = useState<string | undefined>();

  //#region Pond and Fishes
  const [
    stateUsersCatalogFish,
    setStateUsersCatalogFish,
  ] = useState<UsersCatalogFishState>(initialStateUserCatalogFish);

  const [
    stateChannelMainFish,
    setStateChannelMainFish,
  ] = useState<ChannelFishState>(initialStateCannelFish);

  const [
    stateChannelsCatalogFish,
    setStateChannelsCatalogFish,
  ] = useState<ChannelsCatalogFishState>(initialStateChannelsCatalogFish);

  const [errorPond, setErrorPond] = useState<string>();

  useEffect(() => {
    const cancelSubUserCatalogFish = pond.observe(
      UsersCatalogFish.fish,
      setStateUsersCatalogFish
    );

    const cancelSubChannelFish = pond.observe(
      mainChannelFish,
      setStateChannelMainFish
    );

    const cancelSubChannelsCatalogFish = pond.observe(
      ChannelsCatalogFish.fish,
      setStateChannelsCatalogFish
    );

    return () => {
      cancelSubUserCatalogFish();
      cancelSubChannelFish();
      cancelSubChannelsCatalogFish();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //#endregion

  //#region UI handlers

  const handleEditUserProfile = async (displayName: string) => {
    try {
      const isUserProfileEdited = await editUserProfile(pond)(
        stateUI.signedInUserUUID,
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
        stateUI.signedInUserUUID
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
        stateUI.signedInUserUUID
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
          stateUI.signedInUserUUID
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

  const handleOpenEditChannelDialog = (channelId: ChannelId) =>
    setOpenEditChannelDialog(true);

  const handleCloseEditChannelDialog = () => setOpenEditChannelDialog(false);

  const handleAddChannel = async (name: string, description: string) => {
    try {
      const isSuccess = await addChannel(pond)(stateUI.signedInUserUUID)(
        name,
        description
      );
      if (isSuccess) {
        setErrorPond(undefined);
        setMessageInvalid(undefined);
        handleCloseAddChannelDialog();
      } else {
        setMessageInvalid(`That name is already taken by a channel`);
      }
    } catch (err) {
      setMessageInvalid(undefined);
      setErrorPond(err);
    }
  };

  const handleEditChannel = async (name: string, description: string) => {
    window.alert(`edit channel ${name} ${description}`);
  };

  //#endregion

  //#region UI mapping
  const messagesUI = mapPublicMessagesToUI(
    getVisiblePublicMessages(stateChannelMainFish.messages),
    stateUsersCatalogFish.users,
    stateUI.signedInUserUUID
  );

  const userDisplayName = getDisplayNameByUser(
    stateUI.signedInUserUUID,
    stateUsersCatalogFish.users
  );

  const canShowUserProfileEdit =
    stateUI.sectionRight === SectionRight.UserProfileEdit;

  const channelsSideBarUI = mapChannelsToSidebarUI(
    stateChannelsCatalogFish.channels
  );

  const channelsOverviewCatalog = mapChannelsToChannelCatalogUI(
    stateChannelsCatalogFish.channels,
    stateUsersCatalogFish.users,
    stateUI.signedInUserUUID
  );
  //#endregion

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
          <ChannelsCatalog
            channels={channelsOverviewCatalog}
            editChannel={handleOpenEditChannelDialog}
          />
        );
    }
  };

  return (
    <div>
      {errorPond}
      <TopBar userDisplayName={userDisplayName ?? ''} />
      <div>
        <Sidebar
          channels={channelsSideBarUI}
          openAddChannelDialog={handleOpenAddChannelDialog}
        />
      </div>
      {renderSectionCenter()}
      <div>
        {canShowUserProfileEdit && (
          <UserProfileDetails editUserProfile={handleEditUserProfile} />
        )}
      </div>
      {openAddChannelDialog && (
        <AddChannelDialog
          messageError={errorPond}
          messageInvalid={messageInvalid}
          addChannel={handleAddChannel}
          closeDialog={handleCloseAddChannelDialog}
        />
      )}
      {openEditChannelDialog && (
        <EditChannelDialogContainer
          currentName={''}
          currentDescription={''}
          editChannel={handleEditChannel}
          closeDialog={handleCloseEditChannelDialog}
        />
      )}
    </div>
  );
};
