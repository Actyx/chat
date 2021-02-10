import { Pond } from '@actyx/pond';
import React, { FC, useContext } from 'react';
import { UsersCatalogFishState } from '../../business-logic/users-catalog-fish/types';
import { AuthenticationContainer } from '../AuthenticationScreen/AuthenticationContainer';
import { StateContextUI } from '../ui-state-manager/UIStateManager';
import { Screens } from '../ui-state-manager/types';
import { Debug } from '../Debug/Debug';
import { ChatContainer } from '../ChatScreen/ChatContainer';
import { ChannelFishState } from '../../business-logic/channel-fish/types';

type Props = Readonly<{
  pond: Pond;
  stateUsersCatalogFish: UsersCatalogFishState;
  stateChannelMainFish: ChannelFishState;
}>;

export const ScreenRooter: FC<Props> = ({
  pond,
  stateUsersCatalogFish,
  stateChannelMainFish,
}) => {
  const stateUI = useContext(StateContextUI);

  return (
    <div>
      {stateUI.screen === Screens.Authentication ? (
        <AuthenticationContainer
          pond={pond}
          stateUsersCatalogFish={stateUsersCatalogFish}
        />
      ) : stateUI.signedInUserUUID && stateUI.activeChannelId ? (
        <ChatContainer
          pond={pond}
          stateUsersCatalogFish={stateUsersCatalogFish}
          stateChannelMainFish={stateChannelMainFish}
          signedInUserUUID={stateUI.signedInUserUUID}
          activeChannelId={stateUI.activeChannelId}
        />
      ) : (
        'access is not allowed'
      )}
      <Debug
        stateUI={stateUI}
        stateUsersCatalogFish={stateUsersCatalogFish}
        stateChannelMainFish={stateChannelMainFish}
      />
    </div>
  );
};
