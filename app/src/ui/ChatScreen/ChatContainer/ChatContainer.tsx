import { Pond } from '@actyx/pond';
import { useContext, useEffect, useState } from 'react';
import { mkChannelFish } from '../../../business-logic/channel-fish/channel-fish';
import {
  editMessageInChannel,
  hideMessageFromChannel,
  addMessageToChannel,
} from '../../../business-logic/channel-fish/logic';
import { ChannelFishState } from '../../../business-logic/channel-fish/types';
import { ChannelCatalogFish } from '../../../business-logic/channel-catalog-fish/channel-catalog-fish';
import {
  addChannel,
  addDefaultChannelIfDoesNotExist,
  archiveChannel,
  associateUserToChannel,
  dissociateUserChannel,
  editChannel,
  getChannelProfileByChannelId,
  hasUserCreatedChannel,
  unarchiveChannel,
} from '../../../business-logic/channel-catalog-fish/logic';
import { ChannelCatalogFishState } from '../../../business-logic/channel-catalog-fish/types';
import { ChannelId, MessageId } from '../../../business-logic/message/types';
import { editUserProfile } from '../../../business-logic/user-catalog-fish/logic';
import { UserCatalogFishState } from '../../../business-logic/user-catalog-fish/types';
import { UserCatalogFish } from '../../../business-logic/user-catalog-fish/user-catalog-fish';
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
import { EditChannelDialog } from '../EditChannelDialog/EditChannelDialog';
import { Sidebar } from '../Sidebar/Sidebar';
import { TopBar } from '../TopBar';
import {
  getChannelName,
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

export const ChatContainer = ({ pond }: Props) => {
  const dispatch = useContext(DispatchContextUI);

  const stateUI = useContext(StateContextUI);

  const [showAddChannelDialog, setShowAddChannelDialog] = useState<boolean>(
    false
  );

  const [showEditChannelDialog, setShowEditChannelDialog] = useState<boolean>(
    false
  );

  const [selectedChannel, setSelectedChannel] = useState<
    Readonly<{ channelId: ChannelId; name: string; description: string }>
  >();

  const [invalidMessage, setInvalidMessage] = useState<string | undefined>();

  //#region Pond and Fishes

  const [
    stateUserCatalogFish,
    setStateUserCatalogFish,
  ] = useState<UserCatalogFishState>(UserCatalogFish.initialState);

  const [
    stateChannelMainFish,
    setStateChannelMainFish,
  ] = useState<ChannelFishState>(
    mkChannelFish(stateUI.activeChannelId).initialState
  );

  const [
    stateChannelsCatalogFish,
    setStateChannelsCatalogFish,
  ] = useState<ChannelCatalogFishState>(ChannelCatalogFish.initialState);

  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  useEffect(() => {
    const cancelSubUserCatalogFish = pond.observe(
      UserCatalogFish,
      setStateUserCatalogFish
    );

    const cancelSubChannelFish = pond.observe(
      mkChannelFish(stateUI.activeChannelId),
      setStateChannelMainFish
    );

    const cancelSubChannelsCatalogFish = pond.observe(
      ChannelCatalogFish,
      setStateChannelsCatalogFish
    );

    return () => {
      cancelSubUserCatalogFish();
      cancelSubChannelFish();
      cancelSubChannelsCatalogFish();
    };
  }, [pond, stateUI.activeChannelId]);

  useEffect(() => {
    const mainChannel = async () => {
      try {
        await addDefaultChannelIfDoesNotExist(pond)(stateUI.userUUID);
      } catch (err) {
        setPondErrorMessage(undefined);
      }
    };
    mainChannel();
  }, [pond, stateUI.userUUID]);

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
      setPondErrorMessage(undefined);
    } catch (err) {
      setPondErrorMessage(err);
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
      setPondErrorMessage(undefined);
    } catch (err) {
      setPondErrorMessage(err);
    }
  };

  const handleEditMessage = async (messageId: MessageId, content: string) => {
    try {
      await editMessageInChannel(pond)(
        stateUI.activeChannelId,
        stateUI.userUUID
      )(messageId, content);
      setPondErrorMessage(undefined);
    } catch (err) {
      setPondErrorMessage(err);
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
        setPondErrorMessage(undefined);
      } catch (err) {
        setPondErrorMessage(err);
      }
    }
  };

  const handleShowAddChannelDialog = () => setShowAddChannelDialog(true);

  const handleHideAddChannelDialog = () => setShowEditChannelDialog(false);

  const handleShowEditChannelDialog = (channelId: ChannelId) => {
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
      setShowEditChannelDialog(true);
    }
  };

  const handleCloseEditChannelDialog = () => setShowEditChannelDialog(false);

  const handleAddChannel = async (name: string, description: string) => {
    try {
      const isSuccess = await addChannel(pond)(stateUI.userUUID)(
        name,
        description
      );
      if (isSuccess) {
        setPondErrorMessage(undefined);
        setInvalidMessage(undefined);
        handleHideAddChannelDialog();
      } else {
        setInvalidMessage(MESSAGE.invalidName);
      }
    } catch (err) {
      setInvalidMessage(undefined);
      setPondErrorMessage(err);
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
        setPondErrorMessage(undefined);
        setInvalidMessage(undefined);
        handleHideAddChannelDialog();
      } else {
        setInvalidMessage(MESSAGE.invalidName);
      }
    } catch (err) {
      setInvalidMessage(undefined);
      setPondErrorMessage(err);
    }
  };

  const handleArchiveChannel = async (channelId: ChannelId) => {
    try {
      await archiveChannel(pond)(stateUI.userUUID, channelId);
      setPondErrorMessage(undefined);
    } catch (err) {
      setPondErrorMessage(err);
    }
  };

  const handleUnarchiveChannel = async (channelId: ChannelId) => {
    try {
      await unarchiveChannel(pond)(stateUI.userUUID, channelId);
      setPondErrorMessage(undefined);
    } catch (err) {
      setPondErrorMessage(err);
    }
  };

  const handleAssociateUserChannel = async (channelId: ChannelId) => {
    try {
      await associateUserToChannel(pond)(stateUI.userUUID, channelId);
      setPondErrorMessage(undefined);
    } catch (err) {
      setPondErrorMessage(err);
    }
  };

  const handleDissociateUserChannel = async (channelId: ChannelId) => {
    try {
      await dissociateUserChannel(pond)(stateUI.userUUID, channelId);
      setPondErrorMessage(undefined);
    } catch (err) {
      setPondErrorMessage(err);
    }
  };

  //#endregion

  //#region UI mapping
  const channelMessages = mapPublicMessagesToChannelUI(
    getVisiblePublicMessages(stateChannelMainFish.messages),
    stateUserCatalogFish.users,
    stateUI.userUUID
  );

  const userDisplayName = getDisplayNameByUser(
    stateUI.userUUID,
    stateUserCatalogFish.users
  );

  const canShowUserProfileEdit =
    stateUI.sectionRight === SectionRight.UserProfileEdit;

  const channelsSideBarUI = sortAlphabeticChannelsSidebar(
    mapChannelsToSidebarUI(stateChannelsCatalogFish.channels)
  );

  const channelsOverviewCatalog = sortAlphabeticChannelsOverview(
    mapChannelsToChannelCatalogUI(
      stateChannelsCatalogFish.channels,
      stateUserCatalogFish.users,
      stateUI.userUUID
    )
  );

  const canUserManageArchiviation = (channelId: ChannelId) =>
    hasUserCreatedChannel(
      stateUI.userUUID,
      channelId,
      stateChannelsCatalogFish.channels
    );

  const channelName = getChannelName(
    stateUI.activeChannelId,
    stateChannelsCatalogFish.channels
  );
  //#endregion

  const renderSectionCenter = () => {
    switch (stateUI.sectionCenter) {
      case SectionCenter.Channel:
        return (
          <div>
            <Channel
              channelName={channelName}
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
            editChannel={handleShowEditChannelDialog}
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
      {pondErrorMessage}
      <TopBar userDisplayName={userDisplayName} />
      <div>
        <Sidebar
          channels={channelsSideBarUI}
          showAddChannelDialog={handleShowAddChannelDialog}
        />
      </div>
      {renderSectionCenter()}
      <div>
        {canShowUserProfileEdit && (
          <UserProfileDetails editUserProfile={handleEditUserProfile} />
        )}
      </div>
      {showAddChannelDialog && (
        <AddChannelDialog
          errorMessage={pondErrorMessage}
          invalidMessage={invalidMessage}
          addChannel={handleAddChannel}
          closeDialog={handleHideAddChannelDialog}
        />
      )}
      {showEditChannelDialog && selectedChannel && (
        <EditChannelDialog
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
