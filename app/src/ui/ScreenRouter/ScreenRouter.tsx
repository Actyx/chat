import { Pond } from '@actyx/pond';
import { FC, useContext } from 'react';
import { AuthenticationContainer } from '../AuthenticationScreen/AuthenticationContainer';
import { StateContextUI } from '../ui-state-manager/UIStateManager';
import { Screens } from '../ui-state-manager/types';
import { ChatContainer } from '../ChatScreen/ChatContainer/ChatContainer';
import { isUserSignedIn } from '../../business-logic/channel-fish/logic';

type Props = Readonly<{
  pond: Pond;
}>;

const AccessNotAllowed = () => <div>Access is not allowed</div>;

export const ScreenRooter: FC<Props> = ({ pond }) => {
  const stateUI = useContext(StateContextUI);

  const { screen, userUUID } = stateUI;

  const renderScreen = () => {
    switch (screen) {
      case Screens.Authentication:
        return <AuthenticationContainer pond={pond} />;
      case Screens.Chat:
        const canRouteToChatScreen = isUserSignedIn(userUUID);
        return canRouteToChatScreen ? (
          <ChatContainer pond={pond} />
        ) : (
          <AccessNotAllowed />
        );
    }
  };

  return <div>{renderScreen()}</div>;
};
