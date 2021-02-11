import { Pond } from '@actyx/pond';
import React, { FC, useContext } from 'react';
import { AuthenticationContainer } from '../AuthenticationScreen/AuthenticationContainer';
import { StateContextUI } from '../ui-state-manager/UIStateManager';
import { Screens } from '../ui-state-manager/types';
import { ChatContainer } from '../ChatScreen/ChatContainer';
import { PublicMessages } from '../../business-logic/channel-fish/types';

type Props = Readonly<{
  pond: Pond;
  messages: PublicMessages;
}>;

const AccessNotAllowed = () => <div>Access is not allowed</div>;

export const ScreenRooter: FC<Props> = ({ pond, messages }) => {
  const stateUI = useContext(StateContextUI);

  const { screen, signedInUserUUID, activeChannelId } = stateUI;

  const renderScreen = () => {
    switch (screen) {
      case Screens.Authentication:
        return <AuthenticationContainer pond={pond} />;
      case Screens.Chat:
        const canRouteToChatScreen = signedInUserUUID && activeChannelId;
        return canRouteToChatScreen ? (
          <ChatContainer
            pond={pond}
            signedInUserUUID={signedInUserUUID!}
            activeChannelId={activeChannelId!}
          />
        ) : (
          <AccessNotAllowed />
        );
    }
  };

  return <div>{renderScreen()}</div>;
};
