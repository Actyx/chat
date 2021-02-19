import { Pond } from '@actyx/pond';
import { FC, useContext, useEffect, useState } from 'react';
import { mainChannelFish } from '../../../business-logic/channel-fish/channel-fish';
import {
  editMessageInChannel,
  hideMessageFromChannel,
  addMessageToChannel,
} from '../../../business-logic/channel-fish/logic';
import { ChannelFishState } from '../../../business-logic/channel-fish/types';
import { ChannelsCatalogFish } from '../../../business-logic/channels-catalog-fish/channels-catalog-fish';
import {
  addChannel,
  archiveChannel,
  associateUserToChannel,
  dissociateUserChannel,
  editChannel,
  getChannelProfileByChannelId,
  hasUserCreatedChannel,
  unarchiveChannel,
} from '../../../business-logic/channels-catalog-fish/logic';
import { ChannelsCatalogFishState } from '../../../business-logic/channels-catalog-fish/types';
import { ChannelId, MessageId } from '../../../business-logic/message/types';
import { editUserProfile } from '../../../business-logic/users-catalog-fish/logic';
import { UsersCatalogFishState } from '../../../business-logic/users-catalog-fish/types';
import { UsersCatalogFish } from '../../../business-logic/users-catalog-fish/users-catalog-fish';
import { closeSectionRight } from '../../ui-state-manager/actions';
import { SectionCenter, SectionRight } from '../../ui-state-manager/types';
import {
  DispatchContextUI,
  StateContextUI,
} from '../../ui-state-manager/UIStateManager';
import { UserProfileDetails } from '../../UserProfileDetails/UserProfileDetails';
import { AddChannelDialog } from '../AddChannelDialog/AddChannelDialog';
import { Channel } from '../Channel/Channel';
import { MessageInput } from '../Channel/MessageInput';
import { ChannelsCatalog } from '../ChannelsCatalog/ChannelsCatalog';
import { EditChannelDialogContainer } from '../EditChannelDialog/EditChannelDialog';
import { Sidebar } from '../Sidebar/Sidebar';
import { TopBar } from '../TopBar';
import {
  getDisplayNameByUser,
  getVisiblePublicMessages,
  mapChannelsToChannelCatalogUI,
  mapChannelsToSidebarUI,
  mapPublicMessagesToChannelUI,
  sortAlphabeticChannelsOverview,
  sortAlphabeticChannelsSidebar,
} from './ui-map';

// TODO create separate modules
const MESSAGE = {
  invalidName: 'That name is already taken by a channel',
  confirmHideMessage: 'Are you sure to hide this message?',
};

type Props = Readonly<{
  pond: Pond;
}>;

export const ChatContainer: FC<Props> = ({ pond }) => {
  const dispatch = useContext(DispatchContextUI);

  const stateUI = useContext(StateContextUI);

  const [openAddChannelDialog, setOpenAddChannelDialog] = useState<boolean>(
    false
  );

  const [openEditChannelDialog, setOpenEditChannelDialog] = useState<boolean>(
    false
  );

  const [selectedChannel, setSelectedChannel] = useState<
    Readonly<{ channelId: ChannelId; name: string; description: string }>
  >();

  const [messageInvalid, setMessageInvalid] = useState<string | undefined>();

  //#region Pond and Fishes
  const [
    stateUsersCatalogFish,
    setStateUsersCatalogFish,
  ] = useState<UsersCatalogFishState>(UsersCatalogFish.fish.initialState);

  const [
    stateChannelMainFish,
    setStateChannelMainFish,
  ] = useState<ChannelFishState>(mainChannelFish.initialState);

  const [
    stateChannelsCatalogFish,
    setStateChannelsCatalogFish,
  ] = useState<ChannelsCatalogFishState>(ChannelsCatalogFish.fish.initialState);

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
        stateUI.userUUID,
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
        stateUI.userUUID
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
        stateUI.userUUID
      )(messageId, content);
      setErrorPond(undefined);
    } catch (err) {
      setErrorPond(err);
    }
  };

  const handleHideMessage = async (messageId: MessageId) => {
    const hasUserConfirmed = window.confirm(MESSAGE.confirmHideMessage);
    if (hasUserConfirmed) {
      try {
        await hideMessageFromChannel(pond)(
          stateUI.activeChannelId,
          stateUI.userUUID
        )(messageId);
        setErrorPond(undefined);
      } catch (err) {
        setErrorPond(err);
      }
    }
  };

  const handleOpenAddChannelDialog = () => setOpenAddChannelDialog(true);

  const handleCloseAddChannelDialog = () => setOpenAddChannelDialog(false);

  const handleOpenEditChannelDialog = (channelId: ChannelId) => {
    const channelProfile = getChannelProfileByChannelId(
      channelId,
      stateChannelsCatalogFish.channels
    );
    if (channelProfile) {
      setSelectedChannel({
        channelId: channelProfile.channelId,
        name: channelProfile.name,
        description: channelProfile.description ?? '',
      });
      setOpenEditChannelDialog(true);
    }
  };

  const handleCloseEditChannelDialog = () => setOpenEditChannelDialog(false);

  const handleAddChannel = async (name: string, description: string) => {
    try {
      const isSuccess = await addChannel(pond)(stateUI.userUUID)(
        name,
        description
      );
      if (isSuccess) {
        setErrorPond(undefined);
        setMessageInvalid(undefined);
        handleCloseAddChannelDialog();
      } else {
        setMessageInvalid(MESSAGE.invalidName);
      }
    } catch (err) {
      setMessageInvalid(undefined);
      setErrorPond(err);
    }
  };

  const handleEditChannel = async (
    channelId: ChannelId,
    newName: string,
    newDescription: string
  ) => {
    try {
      const isSuccess = await editChannel(pond)(stateUI.userUUID, channelId)(
        newName,
        newDescription
      );
      if (isSuccess) {
        setErrorPond(undefined);
        setMessageInvalid(undefined);
        handleCloseAddChannelDialog();
      } else {
        setMessageInvalid(MESSAGE.invalidName);
      }
    } catch (err) {
      setMessageInvalid(undefined);
      setErrorPond(err);
    }
  };

  const handleArchiveChannel = async (channelId: ChannelId) => {
    try {
      await archiveChannel(pond)(stateUI.userUUID, channelId);
      setErrorPond(undefined);
    } catch (err) {
      setErrorPond(err);
    }
  };

  const handleUnarchiveChannel = async (channelId: ChannelId) => {
    try {
      await unarchiveChannel(pond)(stateUI.userUUID, channelId);
      setErrorPond(undefined);
    } catch (err) {
      setErrorPond(err);
    }
  };

  const handleAssociateUserChannel = async (channelId: ChannelId) => {
    try {
      await associateUserToChannel(pond)(stateUI.userUUID, channelId);
      setErrorPond(undefined);
    } catch (err) {
      setErrorPond(err);
    }
  };

  const handleDissociateUserChannel = async (channelId: ChannelId) => {
    try {
      await dissociateUserChannel(pond)(stateUI.userUUID, channelId);
      setErrorPond(undefined);
    } catch (err) {
      setErrorPond(err);
    }
  };

  //#endregion

  //#region UI mapping
  const channelMessages = mapPublicMessagesToChannelUI(
    getVisiblePublicMessages(stateChannelMainFish.messages),
    stateUsersCatalogFish.users,
    stateUI.userUUID
  );

  const userDisplayName = getDisplayNameByUser(
    stateUI.userUUID,
    stateUsersCatalogFish.users
  );

  const canShowUserProfileEdit =
    stateUI.sectionRight === SectionRight.UserProfileEdit;

  const channelsSideBarUI = sortAlphabeticChannelsSidebar(
    mapChannelsToSidebarUI(stateChannelsCatalogFish.channels)
  );

  const channelsOverviewCatalog = sortAlphabeticChannelsOverview(
    mapChannelsToChannelCatalogUI(
      stateChannelsCatalogFish.channels,
      stateUsersCatalogFish.users,
      stateUI.userUUID
    )
  );

  const canUserManageArchiviation = (channelId: ChannelId) =>
    hasUserCreatedChannel(
      stateUI.userUUID,
      channelId,
      stateChannelsCatalogFish.channels
    );
  //#endregion

  const renderSectionCenter = () => {
    switch (stateUI.sectionCenter) {
      case SectionCenter.Channel:
        return (
          <div>
            <Channel
              messages={channelMessages}
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
            canUserManageArchiviation={canUserManageArchiviation}
            editChannel={handleOpenEditChannelDialog}
            archiveChannel={handleArchiveChannel}
            unarchiveChannel={handleUnarchiveChannel}
            associateUserChannel={handleAssociateUserChannel}
            dissociateUserChannel={handleDissociateUserChannel}
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
      {openEditChannelDialog && selectedChannel && (
        <EditChannelDialogContainer
          currentName={selectedChannel.name}
          currentDescription={selectedChannel.description}
          editChannel={(newName, newDescription) =>
            handleEditChannel(
              selectedChannel.channelId,
              newName,
              newDescription
            )
          }
          closeDialog={handleCloseEditChannelDialog}
        />
      )}
    </div>
  );
};
