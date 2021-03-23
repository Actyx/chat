import { usePond } from '@actyx-contrib/react-pond';
import React, { useContext } from 'react';
import { UserUUID } from '../../../../business-logic/user-catalog-fish/types';
import { UserCatalogFish } from '../../../../business-logic/user-catalog-fish/user-catalog-fish';
import {
  showUserProfileEditSection,
  signOutActiveUser,
} from '../../../state-manager/actions';
import { DispatchContext } from '../../../state-manager/dispatch';
import { useFish } from '../../../utils/use-fish';
import { getDisplayNameByUser } from '../ChatContainer/ui-map';
import { TopBar } from './TopBar';

type TopBarContainerProps = Readonly<{ userUUID: UserUUID }>;

export const TopBarContainer = ({ userUUID }: TopBarContainerProps) => {
  const pond = usePond();

  const dispatch = useContext(DispatchContext);

  const userCatalogFishState = useFish(
    pond,
    UserCatalogFish,
    UserCatalogFish.initialState
  );

  const userDisplayName = getDisplayNameByUser(
    userUUID,
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
