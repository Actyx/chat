import { usePond } from '@actyx-contrib/react-pond';
import React, { useContext } from 'react';
import { UserCatalogFish } from '../../../../business-logic/user-catalog-fish/user-catalog-fish';
import {
  showUserProfileEditSection,
  signOutActiveUser,
} from '../../../state-manager/actions';
import { StateUIAuthenticated } from '../../../state-manager/state-types';
import {
  DispatchContextUI,
  StateContextUI,
} from '../../../state-manager/UIStateManager';
import { useFish } from '../../../utils/use-fish';
import { getDisplayNameByUser } from '../ChatContainer/ui-map';
import { TopBar } from './TopBar';

export const TopBarContainer = () => {
  const dispatch = useContext(DispatchContextUI);

  const pond = usePond();

  const stateUI = useContext(StateContextUI) as StateUIAuthenticated;

  const userCatalogFishState = useFish(
    pond,
    UserCatalogFish,
    UserCatalogFish.initialState
  );

  const userDisplayName = getDisplayNameByUser(
    stateUI.userUUID,
    userCatalogFishState.users
  );

  const handleEditUserProfile = () => dispatch(showUserProfileEditSection());

  const handleSignOut = () => dispatch(signOutActiveUser());

  return (
    <TopBar
      userDisplayName={userDisplayName}
      editUserProfile={handleEditUserProfile}
      signOut={handleSignOut}
    />
  );
};
