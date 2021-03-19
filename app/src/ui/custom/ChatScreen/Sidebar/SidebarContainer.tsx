import { usePond } from '@actyx-contrib/react-pond';
import React, { useContext } from 'react';
import { ChannelCatalogFish } from '../../../../business-logic/channel-catalog-fish/channel-catalog-fish';
import { UserCatalogFish } from '../../../../business-logic/user-catalog-fish/user-catalog-fish';
import {
  DispatchContextUI,
  StateContextUI,
} from '../../../state-manager/UIStateManager';
import { useFish } from '../../../utils/use-fish';
import {
  mapChannelsToSidebarUI,
  mapUsersToSidebarUI,
  sortAlphabeticChannelsSidebar,
  sortAlphabeticUsersSidebar,
} from '../ChatContainer/ui-map';
import { Sidebar } from './Sidebar';
import pkg from '../../../../../package.json';
import {
  showChannelsCatalogSection,
  showChannelSection,
} from '../../../state-manager/actions';
import { ChannelId } from '../../../../business-logic/message/types';

export const SideBarContainer = () => {
  const dispatch = useContext(DispatchContextUI);

  const pond = usePond();

  const stateUI = useContext(StateContextUI);

  const channelsCatalogFishState = useFish(
    pond,
    ChannelCatalogFish,
    ChannelCatalogFish.initialState
  );

  const userCatalogFishState = useFish(
    pond,
    UserCatalogFish,
    UserCatalogFish.initialState
  );

  const channelsSideBarUI = sortAlphabeticChannelsSidebar(
    mapChannelsToSidebarUI(channelsCatalogFishState.channels, stateUI.userUUID)
  );

  const usersSideBarUI = sortAlphabeticUsersSidebar(
    mapUsersToSidebarUI(userCatalogFishState.users)
  );

  const handleSelectChannelsCatalog = () =>
    dispatch(showChannelsCatalogSection());

  const handleSelectChannel = (channelId: ChannelId) =>
    dispatch(showChannelSection(channelId));

  return (
    <Sidebar
      appName={pkg.chat.appName}
      channels={channelsSideBarUI}
      users={usersSideBarUI}
      selectChannelsCatalog={handleSelectChannelsCatalog}
      selectChannel={handleSelectChannel}
    />
  );
};
