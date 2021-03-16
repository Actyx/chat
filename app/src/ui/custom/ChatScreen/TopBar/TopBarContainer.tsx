import { usePond } from '@actyx-contrib/react-pond';
import React, { useContext } from 'react';
import { UserCatalogFish } from '../../../../business-logic/user-catalog-fish/user-catalog-fish';
import { StateContextUI } from '../../../state-manager/UIStateManager';
import { useFish } from '../../../utils/use-fish';
import { getDisplayNameByUser } from '../ChatContainer/ui-map';
import { TopBar } from './TopBar';

export const TopBarContainer = () => {
  const pond = usePond();

  const stateUI = useContext(StateContextUI);

  const stateUserCatalogFish = useFish(
    pond,
    UserCatalogFish,
    UserCatalogFish.initialState
  );

  const userDisplayName = getDisplayNameByUser(
    stateUI.userUUID,
    stateUserCatalogFish.users
  );

  return <TopBar userDisplayName={userDisplayName} />;
};
