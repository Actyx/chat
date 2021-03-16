import { useContext } from 'react';
import { AuthenticationScreen } from '../AuthenticationScreen/AuthenticationScreen';
import { StateContextUI } from '../../state-manager/UIStateManager';
import { Screens } from '../../state-manager/types';
import { ChatContainer } from '../ChatScreen/ChatContainer/ChatContainer';
import { isSignedInUser } from '../../../business-logic/user-catalog-fish/logic/helpers';

const AccessNotAllowed = () => <div>Access is not allowed</div>;

export const ScreenRouter = () => {
  const stateUI = useContext(StateContextUI);

  const { screen, userUUID } = stateUI;

  const renderScreen = () => {
    switch (screen) {
      case Screens.Authentication:
        return <AuthenticationScreen />;
      case Screens.Chat:
        const canRouteToChatScreen = isSignedInUser(userUUID);
        return canRouteToChatScreen ? <ChatContainer /> : <AccessNotAllowed />;
    }
  };

  return renderScreen();
};
