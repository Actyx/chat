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
import { SectionRight } from '../../ui-state-manager/types';
import {
  DispatchContextUI,
  StateContextUI,
} from '../../ui-state-manager/UIStateManager';
import {
  getChannelNameAndDescription,
  getDisplayNameByUser,
  getTotalUsersNumber,
  getVisiblePublicMessages,
  mapChannelsToChannelCatalogUI,
  mapChannelsToSidebarUI,
  mapPublicMessagesToChannelUI,
  mapUsersToSidebarUI,
  sortAlphabeticChannelsOverview,
  sortAlphabeticChannelsSidebar,
  sortAlphabeticUsersSidebar,
} from './ui-map';
import { Chat } from './Chat';
import pkg from '../../../../package.json';

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

  const handleHideUserProfileDetails = () => dispatch(closeSectionRight());

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

  const canShowUserProfileDetails =
    stateUI.sectionRight === SectionRight.UserProfileEdit;

  const channelsSideBarUI = sortAlphabeticChannelsSidebar(
    mapChannelsToSidebarUI(stateChannelsCatalogFish.channels)
  );

  const usersSideBarUI = sortAlphabeticUsersSidebar(
    mapUsersToSidebarUI(stateUserCatalogFish.users)
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

  const { channelName, channelDescription } = getChannelNameAndDescription(
    stateUI.activeChannelId,
    stateChannelsCatalogFish.channels
  );

  const totalUsers = getTotalUsersNumber(
    stateUI.activeChannelId,
    stateChannelsCatalogFish.channels,
    stateUserCatalogFish.users
  );
  //#endregion

  return (
    <Chat
      appName={pkg.chat.appName}
      totalUsers={totalUsers}
      sectionCenter={stateUI.sectionCenter}
      activeChannelId={stateUI.activeChannelId}
      userDisplayName={userDisplayName}
      channelsSideBarUI={channelsSideBarUI}
      usersSideBarUI={usersSideBarUI}
      channelName={channelName}
      channelDescription={channelDescription}
      channelMessages={channelMessages}
      channelsOverviewCatalog={channelsOverviewCatalog}
      selectedChannel={selectedChannel}
      showAddChannelDialog={showAddChannelDialog}
      showEditChannelDialog={showEditChannelDialog}
      canShowUserProfileDetails={canShowUserProfileDetails}
      canUserManageArchiviation={canUserManageArchiviation}
      pondErrorMessage={pondErrorMessage}
      invalidMessage={invalidMessage}
      handleShowEditChannelDialog={handleShowEditChannelDialog}
      handleShowAddChannelDialog={handleShowAddChannelDialog}
      handleEditUserProfile={handleEditUserProfile}
      handleAddMessage={handleAddMessage}
      handleEditMessage={handleEditMessage}
      handleHideMessage={handleHideMessage}
      handleAddChannel={handleAddChannel}
      handleCloseEditChannelDialog={handleCloseEditChannelDialog}
      handleHideAddChannelDialog={handleHideAddChannelDialog}
      handleArchiveChannel={handleArchiveChannel}
      handleUnarchiveChannel={handleUnarchiveChannel}
      handleAssociateUserChannel={handleAssociateUserChannel}
      handleDissociateUserChannel={handleDissociateUserChannel}
      handleHideUserProfileDetails={handleHideUserProfileDetails}
      handleEditChannel={handleEditChannel}
    />
  );
};
