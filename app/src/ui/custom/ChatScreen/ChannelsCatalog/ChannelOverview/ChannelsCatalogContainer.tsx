import { usePond } from '@actyx-contrib/react-pond';
import React, { useContext } from 'react';
import { ChannelCatalogFish } from '../../../../../business-logic/channel-catalog-fish/channel-catalog-fish';
import { ChannelId } from '../../../../../business-logic/message/types';
import { UserUUID } from '../../../../../business-logic/user-catalog-fish/types';
import { UserCatalogFish } from '../../../../../business-logic/user-catalog-fish/user-catalog-fish';
import {
  showAddChannelDialog,
  showEditChannelDialog,
} from '../../../../state-manager/actions';
import { DispatchContextUI } from '../../../../state-manager/dispatch';
import { useFish } from '../../../../utils/use-fish';
import {
  mapChannelsToChannelCatalogUI,
  sortAlphabeticChannelsOverview,
} from '../../ChatContainer/ui-map';
import { ChannelsCatalog } from './ChannelsCatalog';

type ChannelsCatalogContainerProps = Readonly<{
  userUUID: UserUUID;
  activeEditChannelId: (channelId: ChannelId) => void;
}>;

export const ChannelsCatalogContainer = ({
  userUUID,
  activeEditChannelId,
}: ChannelsCatalogContainerProps) => {
  const dispatch = useContext(DispatchContextUI);

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

  const channelsOverviewCatalog = sortAlphabeticChannelsOverview(
    mapChannelsToChannelCatalogUI(
      channelsCatalogFishState.channels,
      userCatalogFishState.users,
      userUUID
    )
  );

  const handleShowAddDialog = () => dispatch(showAddChannelDialog());

  const handleShowEditChannelDialog = (channelId: ChannelId) => {
    dispatch(showEditChannelDialog());
    activeEditChannelId(channelId); // TODO should be placeit in global UI state so we do not need to pass it around?
  };

  return (
    <ChannelsCatalog
      userUUID={userUUID}
      channels={channelsOverviewCatalog}
      showAddChannelDialog={handleShowAddDialog}
      showEditChannelDialog={handleShowEditChannelDialog}
    />
  );
};
