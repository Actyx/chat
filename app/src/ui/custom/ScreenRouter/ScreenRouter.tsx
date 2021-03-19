import { useContext } from 'react';
import { AuthenticationScreen } from '../AuthenticationScreen/AuthenticationScreen';
import { StateContextUI } from '../../state-manager/UIStateManager';
import { ChatContainer } from '../ChatScreen/ChatContainer/ChatContainer';
import { Screens } from '../../state-manager/state-types';

export const ScreenRouter = () => {
  const stateUI = useContext(StateContextUI);

  const renderScreen = () => {
    switch (stateUI.screen) {
      case Screens.Authentication:
        return <AuthenticationScreen />;
      case Screens.Chat:
        return <ChatContainer />;
    }
  };

  return renderScreen();
};
