import { Pond } from '@actyx/pond';
import React, { FC, useContext } from 'react';
import { UsersCatalogFishState } from '../../business-logic/users-catalog-fish/types';
import { AuthenticationContainer } from '../Authentication/AuthenticationContainer';
import { StateContextUI } from '../ui-state-manager/UIStateManager';
import { Screens } from '../ui-state-manager/types';
import { Debug } from '../Debug/Debug';

type Props = Readonly<{
  pond: Pond;
  stateUsersCatalogFish: UsersCatalogFishState;
}>;

export const ScreenRooter: FC<Props> = ({
  pond,
  stateUsersCatalogFish: stateUsersCatalog,
}) => {
  const stateUI = useContext(StateContextUI);

  return stateUI.screen === Screens.Authentication ? (
    <>
      <AuthenticationContainer pond={pond} fishState={stateUsersCatalog} />
      <Debug stateUI={stateUI} stateUsersCatalogFish={stateUsersCatalog} />
    </>
  ) : (
    <div>chat screen here</div>
  );
};
