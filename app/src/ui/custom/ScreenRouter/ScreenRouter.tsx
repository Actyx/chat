import { Pond } from '@actyx/pond';
import { useContext } from 'react';
import { AuthenticationContainer } from '../AuthenticationScreen/AuthenticationContainer';
import { StateContextUI } from '../../state-manager/UIStateManager';
import { Screens } from '../../state-manager/types';
import { ChatContainer } from '../ChatScreen/ChatContainer/ChatContainer';
import { isSignedInUser } from '../../../business-logic/user-catalog-fish/logic';

type ScreenRooterProps = Readonly<{
  pond: Pond;
}>;

const AccessNotAllowed = () => <div>Access is not allowed</div>;

export const ScreenRooter = ({ pond }: ScreenRooterProps) => {
  const stateUI = useContext(StateContextUI);

  const { screen, userUUID } = stateUI;

  const renderScreen = () => {
    switch (screen) {
      case Screens.Authentication:
        return <AuthenticationContainer pond={pond} />;
      case Screens.Chat:
        const canRouteToChatScreen = isSignedInUser(userUUID);
        return canRouteToChatScreen ? (
          <ChatContainer pond={pond} />
        ) : (
          <AccessNotAllowed />
        );
    }
  };

  return renderScreen();
};
