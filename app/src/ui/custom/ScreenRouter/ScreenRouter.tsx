import { AuthenticationScreen } from '../AuthenticationScreen/AuthenticationScreen';
import { ChatContainer } from '../ChatScreen/ChatContainer/ChatContainer';
import { StateUI } from '../../state-manager/state-types';

type ScreenRouterProps = Readonly<{
  stateUI: StateUI;
}>;

export const ScreenRouter = ({ stateUI }: ScreenRouterProps) => {
  const renderScreen = () => {
    switch (stateUI.type) {
      case 'anonymous':
        return <AuthenticationScreen />;
      case 'autheticated':
        return (
          <ChatContainer
            userUUID={stateUI.userUUID}
            screen={stateUI.screen}
            dialog={stateUI.dialog}
            sectionRight={stateUI.sectionRight}
            sectionCenter={stateUI.sectionCenter}
            activeChannelId={stateUI.activeChannelId}
          />
        );
    }
  };

  return renderScreen();
};
