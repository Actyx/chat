import { Pond } from '@actyx/pond';
import { useContext, useEffect, useState } from 'react';
import { mkChannelFish } from '../../../../business-logic/channel-fish/channel-fish';
import {
  editMessageInChannel,
  hideMessageFromChannel,
  addMessageToChannel,
} from '../../../../business-logic/channel-fish/logic';
import { ChannelFishState } from '../../../../business-logic/channel-fish/types';
import { ChannelCatalogFish } from '../../../../business-logic/channel-catalog-fish/channel-catalog-fish';
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
} from '../../../../business-logic/channel-catalog-fish/logic';
import { ChannelCatalogFishState } from '../../../../business-logic/channel-catalog-fish/types';
import { ChannelId, MessageId } from '../../../../business-logic/message/types';
import { editUserProfile } from '../../../../business-logic/user-catalog-fish/logic';
import { UserCatalogFishState } from '../../../../business-logic/user-catalog-fish/types';
import { UserCatalogFish } from '../../../../business-logic/user-catalog-fish/user-catalog-fish';
import {
  closeSectionRight,
  hideDialog,
  showEditChannelDialog,
} from '../../../ui-state-manager/actions';
import { showAddChannelDialog } from '../../../ui-state-manager/actions';
import { SectionRight } from '../../../ui-state-manager/types';
import {
  DispatchContextUI,
  StateContextUI,
} from '../../../ui-state-manager/UIStateManager';
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

type ChatContainerProps = Readonly<{
  pond: Pond;
}>;

export const ChatContainer = ({ pond }: ChatContainerProps) => {
  const dispatch = useContext(DispatchContextUI);

  const stateUI = useContext(StateContextUI);

  const [selectedChannel, setSelectedChannel] = useState<
    Readonly<{ channelId: ChannelId; name: string; description: string }>
  >();

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

  // TODO remove duplication by using utility fns
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

  const handleEditUserProfile = (displayName: string): Promise<boolean> =>
    editUserProfile(pond)(stateUI.userUUID, displayName);

  const handleAddMessage = (content: string): Promise<boolean> =>
    addMessageToChannel(pond)(stateUI.activeChannelId, stateUI.userUUID)({
      content,
    });

  const handleEditMessage = (messageId: MessageId, content: string) =>
    editMessageInChannel(pond)(stateUI.activeChannelId, stateUI.userUUID)(
      messageId,
      content
    );

  const handleHideMessage = (messageId: MessageId) =>
    hideMessageFromChannel(pond)(stateUI.activeChannelId, stateUI.userUUID)(
      messageId
    );

  const handleHideDialog = () => dispatch(hideDialog());

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
  ): Promise<boolean> => addChannel(pond)(stateUI.userUUID)(name, description);

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

  const handleHideUserProfileDetails = () => dispatch(closeSectionRight());

  const handleShowAddChannelDialog = () => {
    dispatch(showAddChannelDialog());
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
      userDisplayName={userDisplayName}
      //
      appName={pkg.chat.appName}
      channelsSideBarUI={channelsSideBarUI}
      usersSideBarUI={usersSideBarUI}
      //
      totalUsers={totalUsers}
      channelName={channelName}
      channelDescription={channelDescription}
      channelMessages={channelMessages}
      //
      channelsOverviewCatalog={channelsOverviewCatalog}
      canUserManageArchiviation={canUserManageArchiviation}
      //
      selectedChannel={selectedChannel}
      //
      pondErrorMessage={pondErrorMessage}
      //
      handleShowAddChannelDialog={handleShowAddChannelDialog}
      handleAddChannel={handleAddChannel}
      //
      handleShowEditChannelDialog={handleShowEditChannelDialog}
      handleEditChannel={handleEditChannel}
      //
      handleHideDialog={handleHideDialog}
      //
      //
      handleAddMessage={handleAddMessage}
      handleEditMessage={handleEditMessage}
      handleHideMessage={handleHideMessage}
      handleArchiveChannel={handleArchiveChannel}
      handleUnarchiveChannel={handleUnarchiveChannel}
      handleAssociateUserChannel={handleAssociateUserChannel}
      handleDissociateUserChannel={handleDissociateUserChannel}
      //
      canShowUserProfileDetails={canShowUserProfileDetails}
      handleHideUserProfileDetails={handleHideUserProfileDetails}
      handleEditUserProfile={handleEditUserProfile}
    />
  );
};
