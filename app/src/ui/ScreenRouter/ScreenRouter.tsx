import { Pond } from '@actyx/pond';
import React, { FC, useContext } from 'react';
import { UsersCatalogFishState } from '../../business-logic/users-catalog-fish/types';
import { AuthenticationContainer } from '../AuthenticationScreen/AuthenticationContainer';
import { StateContextUI } from '../ui-state-manager/UIStateManager';
import { Screens } from '../ui-state-manager/types';
import { Debug } from '../Debug/Debug';
import { ChatContainer } from '../ChatScreen/ChatContainer';

type Props = Readonly<{
  pond: Pond;
  stateUsersCatalogFish: UsersCatalogFishState;
}>;

export const ScreenRooter: FC<Props> = ({
  pond,
  stateUsersCatalogFish: stateUsersCatalog,
}) => {
  const stateUI = useContext(StateContextUI);

  return (
    <div>
      {stateUI.screen === Screens.Authentication ? (
        <>
          <AuthenticationContainer
            pond={pond}
            stateUsersCatalogFish={stateUsersCatalog}
          />
        </>
      ) : (
        <ChatContainer pond={pond} stateUsersCatalogFish={stateUsersCatalog} />
      )}
      <Debug stateUI={stateUI} stateUsersCatalogFish={stateUsersCatalog} />
    </div>
  );
};
