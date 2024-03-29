import { usePond } from '@actyx-contrib/react-pond';
import React, { useContext } from 'react';
import { ChannelCatalogFish } from '../../../../business-logic/channel-catalog-fish/channel-catalog-fish';
import { UserCatalogFish } from '../../../../business-logic/user-catalog-fish/user-catalog-fish';

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
import { UserUUID } from '../../../../business-logic/user-catalog-fish/types';
import { SectionCenter } from '../../../state-manager/state-types';
import { DispatchContext } from '../../../state-manager/dispatch';

type SideBarContainerProps = Readonly<{
  userUUID: UserUUID;
  activeChannelId: ChannelId;
  sectionCenter: SectionCenter;
}>;

export const SideBarContainer = ({
  userUUID,
  activeChannelId,
  sectionCenter,
}: SideBarContainerProps) => {
  const dispatch = useContext(DispatchContext);

  const pond = usePond();

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
    mapChannelsToSidebarUI(channelsCatalogFishState.channels, userUUID)
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
      activeChannelId={activeChannelId}
      appName={pkg.chat.appName}
      channels={channelsSideBarUI}
      users={usersSideBarUI}
      sectionCenter={sectionCenter}
      selectChannelsCatalog={handleSelectChannelsCatalog}
      selectChannel={handleSelectChannel}
    />
  );
};
