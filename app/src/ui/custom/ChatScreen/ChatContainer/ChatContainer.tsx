import React, { useContext, useEffect, useState } from 'react';
import { mkChannelFish } from '../../../../business-logic/channel-fish/channel-fish';
import { ChannelCatalogFish } from '../../../../business-logic/channel-catalog-fish/channel-catalog-fish';
import {
  addDefaultChannelIfDoesNotExist,
  archiveChannel,
  associateUserToChannel,
  dissociateUserChannel,
  editChannel,
  hasUserCreatedChannel,
  unarchiveChannel,
} from '../../../../business-logic/channel-catalog-fish/logic';
import { ChannelId } from '../../../../business-logic/message/types';
import { UserCatalogFish } from '../../../../business-logic/user-catalog-fish/user-catalog-fish';
import {
  hideDialog,
  showEditChannelDialog,
} from '../../../state-manager/actions';
import { showAddChannelDialog } from '../../../state-manager/actions';
import { SectionRight } from '../../../state-manager/types';
import {
  DispatchContextUI,
  StateContextUI,
} from '../../../state-manager/UIStateManager';
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
import pkg from '../../../../../package.json';
import { Alert } from '../../../common/Alert/Alert';
import { useFish } from '../../../utils/use-fish';
import { getChannelProfileByChannelId } from '../../../../business-logic/channel-catalog-fish/logic-helpers';
import { addChannelWireForUi } from '../../../../business-logic/channel-catalog-fish/wire';
import { AddChannelLogicResult } from '../../../../business-logic/channel-catalog-fish/types';
import { usePond } from '@actyx-contrib/react-pond';

export const ChatContainer = () => {
  const dispatch = useContext(DispatchContextUI);

  const pond = usePond();

  const stateUI = useContext(StateContextUI);

  const [selectedChannel, setSelectedChannel] = useState<
    Readonly<{ channelId: ChannelId; name: string; description: string }>
  >();

  //#region Pond and Fishes

  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const stateUserCatalogFish = useFish(
    pond,
    UserCatalogFish,
    UserCatalogFish.initialState
  );

  const stateChannelMainFish = useFish(
    pond,
    mkChannelFish(stateUI.activeChannelId),
    mkChannelFish(stateUI.activeChannelId).initialState
  );

  const stateChannelsCatalogFish = useFish(
    pond,
    ChannelCatalogFish,
    ChannelCatalogFish.initialState
  );

  useEffect(() => {
    const mainChannel = async () => {
      try {
        await addDefaultChannelIfDoesNotExist(pond)(stateUI.userUUID);
      } catch (err) {
        setPondErrorMessage(err);
      }
    };
    mainChannel();
  }, [pond, stateUI.userUUID]);

  //#endregion

  //#region Handlers operations

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
      dispatch(showEditChannelDialog());
    }
  };

  const handleAddChannel = (
    name: string,
    description: string
  ): Promise<AddChannelLogicResult> =>
    addChannelWireForUi(pond)(stateUI.userUUID)(name, description);

  const handleEditChannel = async (
    channelId: ChannelId,
    newName: string,
    newDescription: string
  ): Promise<boolean> =>
    editChannel(pond)(stateUI.userUUID, channelId)(newName, newDescription);

  const handleArchiveChannel = async (channelId: ChannelId): Promise<boolean> =>
    archiveChannel(pond)(stateUI.userUUID, channelId);

  const handleUnarchiveChannel = (channelId: ChannelId): Promise<boolean> =>
    unarchiveChannel(pond)(stateUI.userUUID, channelId);

  const handleAssociateUserChannel = async (
    channelId: ChannelId
  ): Promise<boolean> =>
    associateUserToChannel(pond)(stateUI.userUUID, channelId);

  const handleDissociateUserChannel = async (
    channelId: ChannelId
  ): Promise<boolean> =>
    dissociateUserChannel(pond)(stateUI.userUUID, channelId);

  //#endregion

  //#region Handlers navigation

  const handleShowAddChannelDialog = () => {
    dispatch(showAddChannelDialog());
  };

  const handleHideDialog = () => dispatch(hideDialog());

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
    mapChannelsToSidebarUI(stateChannelsCatalogFish.channels, stateUI.userUUID)
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
    <>
      {pondErrorMessage && <Alert variant="danger">{pondErrorMessage}</Alert>}
      <Chat
        appName={pkg.chat.appName}
        userDisplayName={userDisplayName}
        channelsSideBarUI={channelsSideBarUI}
        usersSideBarUI={usersSideBarUI}
        totalUsers={totalUsers}
        channelName={channelName}
        channelDescription={channelDescription}
        channelMessages={channelMessages}
        channelsOverviewCatalog={channelsOverviewCatalog}
        selectedChannel={selectedChannel}
        canUserManageArchiviation={canUserManageArchiviation}
        canShowUserProfileDetails={canShowUserProfileDetails}
        handleShowAddChannelDialog={handleShowAddChannelDialog}
        handleShowEditChannelDialog={handleShowEditChannelDialog}
        handleAddChannel={handleAddChannel}
        handleEditChannel={handleEditChannel}
        handleArchiveChannel={handleArchiveChannel}
        handleUnarchiveChannel={handleUnarchiveChannel}
        handleAssociateUserChannel={handleAssociateUserChannel}
        handleDissociateUserChannel={handleDissociateUserChannel}
        handleHideDialog={handleHideDialog}
      />
    </>
  );
};
