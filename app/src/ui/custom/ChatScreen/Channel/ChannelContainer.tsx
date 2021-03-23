import { usePond } from '@actyx-contrib/react-pond';
import React from 'react';
import { ChannelCatalogFish } from '../../../../business-logic/channel-catalog-fish/channel-catalog-fish';
import { mkChannelFish } from '../../../../business-logic/channel-fish/channel-fish';
import { ChannelId } from '../../../../business-logic/message/types';
import { UserUUID } from '../../../../business-logic/user-catalog-fish/types';
import { UserCatalogFish } from '../../../../business-logic/user-catalog-fish/user-catalog-fish';
import { useFish } from '../../../utils/use-fish';
import {
  getChannelNameAndDescription,
  getTotalUsersNumber,
  getVisiblePublicMessages,
  mapPublicMessagesToChannelUI,
} from '../ChatContainer/ui-map';
import { Channel } from './Channel';

type ChannelContainerProps = Readonly<{
  userUUID: UserUUID;
  activeChannelId: ChannelId;
}>;

export const ChannelContainer = ({
  userUUID,
  activeChannelId,
}: ChannelContainerProps) => {
  const pond = usePond();

  const channelFishState = useFish(
    pond,
    mkChannelFish(activeChannelId),
    mkChannelFish(activeChannelId).initialState
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
    userUUID
  );

  const totalUsers = getTotalUsersNumber(
    activeChannelId,
    channelCatalogFishState.channels,
    userCatalogFishState.users
  );

  const { channelName, channelDescription } = getChannelNameAndDescription(
    activeChannelId,
    channelCatalogFishState.channels
  );

  return (
    <Channel
      userUUID={userUUID}
      activeChannelId={activeChannelId}
      totalUsers={totalUsers}
      channelName={channelName}
      channelDescription={channelDescription}
      messages={channelMessages}
    />
  );
};
