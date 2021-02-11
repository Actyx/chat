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

const AccessNotAllowed = () => <div>Access is not allowed</div>;

export const ScreenRooter: FC<Props> = ({
  pond,
  stateUsersCatalogFish,
  stateChannelMainFish,
}) => {
  const stateUI = useContext(StateContextUI);

  const { screen, signedInUserUUID, activeChannelId } = stateUI;

  const renderScreen = () => {
    switch (screen) {
      case Screens.Authentication:
        return (
          <AuthenticationContainer
            pond={pond}
            users={stateUsersCatalogFish.users}
          />
        );
      case Screens.Chat:
        const canRouteToChatScreen = signedInUserUUID && activeChannelId;
        return canRouteToChatScreen ? (
          <ChatContainer
            pond={pond}
            users={stateUsersCatalogFish.users}
            messages={stateChannelMainFish.messages}
            signedInUserUUID={signedInUserUUID!}
            activeChannelId={activeChannelId!}
          />
        ) : (
          <AccessNotAllowed />
        );
    }
  };

  return (
    <div>
      {renderScreen()}

      <Debug
        stateUI={stateUI}
        stateUsersCatalogFish={stateUsersCatalogFish}
        stateChannelMainFish={stateChannelMainFish}
      />
    </div>
  );
};
