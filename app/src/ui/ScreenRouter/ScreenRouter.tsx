import { Pond } from '@actyx/pond';
import React, { FC, useContext } from 'react';
import { AuthenticationContainer } from '../AuthenticationScreen/AuthenticationContainer';
import { StateContextUI } from '../ui-state-manager/UIStateManager';
import { Screens } from '../ui-state-manager/types';
import { ChatContainer } from '../ChatScreen/ChatContainer';

type Props = Readonly<{
  pond: Pond;
}>;

const AccessNotAllowed = () => <div>Access is not allowed</div>;

export const ScreenRooter: FC<Props> = ({ pond }) => {
  const stateUI = useContext(StateContextUI);

  const { screen, signedInUserUUID } = stateUI;

  const renderScreen = () => {
    switch (screen) {
      case Screens.Authentication:
        return <AuthenticationContainer pond={pond} />;
      case Screens.Chat:
        const canRouteToChatScreen = signedInUserUUID;
        return canRouteToChatScreen ? (
          <ChatContainer pond={pond} signedInUserUUID={signedInUserUUID!} />
        ) : (
          <AccessNotAllowed />
        );
    }
  };

  return <div>{renderScreen()}</div>;
};
