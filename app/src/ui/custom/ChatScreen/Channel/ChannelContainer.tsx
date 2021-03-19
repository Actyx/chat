import { usePond } from '@actyx-contrib/react-pond';
import React, { useContext } from 'react';
import { ChannelCatalogFish } from '../../../../business-logic/channel-catalog-fish/channel-catalog-fish';
import { mkChannelFish } from '../../../../business-logic/channel-fish/channel-fish';
import { UserCatalogFish } from '../../../../business-logic/user-catalog-fish/user-catalog-fish';
import { StateUIAuthenticated } from '../../../state-manager/state-types';
import { StateContextUI } from '../../../state-manager/UIStateManager';
import { useFish } from '../../../utils/use-fish';
import {
  getChannelNameAndDescription,
  getTotalUsersNumber,
  getVisiblePublicMessages,
  mapPublicMessagesToChannelUI,
} from '../ChatContainer/ui-map';
import { Channel } from './Channel';

export const ChannelContainer = () => {
  const pond = usePond();

  const stateUI = useContext(StateContextUI) as StateUIAuthenticated;

  const channelFishState = useFish(
    pond,
    mkChannelFish(stateUI.activeChannelId),
    mkChannelFish(stateUI.activeChannelId).initialState
  );

  const userCatalogFishState = useFish(
    pond,
    UserCatalogFish,
    UserCatalogFish.initialState
  );

  const channelCatalogFishState = useFish(
    pond,
    ChannelCatalogFish,
    ChannelCatalogFish.initialState
  );

  const channelMessages = mapPublicMessagesToChannelUI(
    getVisiblePublicMessages(channelFishState.messages),
    userCatalogFishState.users,
    stateUI.userUUID
  );

  const totalUsers = getTotalUsersNumber(
    stateUI.activeChannelId,
    channelCatalogFishState.channels,
    userCatalogFishState.users
  );

  const { channelName, channelDescription } = getChannelNameAndDescription(
    stateUI.activeChannelId,
    channelCatalogFishState.channels
  );

  return (
    <Channel
      totalUsers={totalUsers}
      channelName={channelName}
      channelDescription={channelDescription}
      messages={channelMessages}
    />
  );
};
