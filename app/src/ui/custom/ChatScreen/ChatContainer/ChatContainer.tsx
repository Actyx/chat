import React, { useContext, useEffect, useState } from 'react';
import { mkChannelFish } from '../../../../business-logic/channel-fish/channel-fish';
import { ChannelCatalogFish } from '../../../../business-logic/channel-catalog-fish/channel-catalog-fish';
import {
  addDefaultChannelIfDoesNotExist,
  hasUserCreatedChannel,
} from '../../../../business-logic/channel-catalog-fish/logic';
import { ChannelId } from '../../../../business-logic/message/types';
import { UserCatalogFish } from '../../../../business-logic/user-catalog-fish/user-catalog-fish';
import { showEditChannelDialog } from '../../../state-manager/actions';
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
        showEditChannelDialog={handleShowEditChannelDialog}
      />
    </>
  );
};
