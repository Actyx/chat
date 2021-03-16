import { usePond } from '@actyx-contrib/react-pond';
import React, { useContext } from 'react';
import { ChannelCatalogFish } from '../../../../business-logic/channel-catalog-fish/channel-catalog-fish';
import { UserCatalogFish } from '../../../../business-logic/user-catalog-fish/user-catalog-fish';
import { StateContextUI } from '../../../state-manager/UIStateManager';
import { useFish } from '../../../utils/use-fish';
import {
  mapChannelsToSidebarUI,
  mapUsersToSidebarUI,
  sortAlphabeticChannelsSidebar,
  sortAlphabeticUsersSidebar,
} from '../ChatContainer/ui-map';
import { Sidebar } from './Sidebar';
import pkg from '../../../../../package.json';

export const SideBarContainer = () => {
  const pond = usePond();

  const stateUI = useContext(StateContextUI);

  const stateChannelsCatalogFish = useFish(
    pond,
    ChannelCatalogFish,
    ChannelCatalogFish.initialState
  );

  const stateUserCatalogFish = useFish(
    pond,
    UserCatalogFish,
    UserCatalogFish.initialState
  );

  const channelsSideBarUI = sortAlphabeticChannelsSidebar(
    mapChannelsToSidebarUI(stateChannelsCatalogFish.channels, stateUI.userUUID)
  );

  const usersSideBarUI = sortAlphabeticUsersSidebar(
    mapUsersToSidebarUI(stateUserCatalogFish.users)
  );

  return (
    <Sidebar
      appName={pkg.chat.appName}
      channels={channelsSideBarUI}
      users={usersSideBarUI}
    />
  );
};
