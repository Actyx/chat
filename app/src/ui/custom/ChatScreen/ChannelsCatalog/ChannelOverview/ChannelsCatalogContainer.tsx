import { usePond } from '@actyx-contrib/react-pond';
import React, { useContext } from 'react';
import { ChannelCatalogFish } from '../../../../../business-logic/channel-catalog-fish/channel-catalog-fish';
import { ChannelId } from '../../../../../business-logic/message/types';
import { UserCatalogFish } from '../../../../../business-logic/user-catalog-fish/user-catalog-fish';
import {
  showAddChannelDialog,
  showEditChannelDialog,
} from '../../../../state-manager/actions';
import {
  DispatchContextUI,
  StateContextUI,
} from '../../../../state-manager/UIStateManager';
import { useFish } from '../../../../utils/use-fish';
import {
  mapChannelsToChannelCatalogUI,
  sortAlphabeticChannelsOverview,
} from '../../ChatContainer/ui-map';
import { ChannelsCatalog } from './ChannelsCatalog';

type ChannelsCatalogContainerProps = Readonly<{
  activeEditChannelId: (channelId: ChannelId) => void;
}>;

export const ChannelsCatalogContainer = ({
  activeEditChannelId,
}: ChannelsCatalogContainerProps) => {
  const dispatch = useContext(DispatchContextUI);

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

  const channelsOverviewCatalog = sortAlphabeticChannelsOverview(
    mapChannelsToChannelCatalogUI(
      stateChannelsCatalogFish.channels,
      stateUserCatalogFish.users,
      stateUI.userUUID
    )
  );

  const handleShowAddDialog = () => dispatch(showAddChannelDialog());

  const handleShowEditChannelDialog = (channelId: ChannelId) => {
    dispatch(showEditChannelDialog());
    activeEditChannelId(channelId); // TODO should be placeit in global UI state so we do not need to pass it around?
  };

  return (
    <ChannelsCatalog
      channels={channelsOverviewCatalog}
      showAddChannelDialog={handleShowAddDialog}
      showEditChannelDialog={handleShowEditChannelDialog}
    />
  );
};
