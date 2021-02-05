import { Pond } from '@actyx/pond';
import React, { FC, useContext } from 'react';
import { editUserProfile } from '../../business-logic/users-catalog-fish/logic';
import { UsersCatalogFishState } from '../../business-logic/users-catalog-fish/types';
import { closeSectionRight } from '../ui-state-manager/actions';
import {
  DispatchContextUI,
  StateContextUI,
} from '../ui-state-manager/UIStateManager';
import { UserProfileDetails } from './UserProfileDetails';

type Props = Readonly<{
  pond: Pond;
  stateUsersCatalogFish: UsersCatalogFishState;
}>;

export const UserProfileContainer: FC<Props> = ({
  pond,
  stateUsersCatalogFish,
}) => {
  const dispatch = useContext(DispatchContextUI);

  const stateUI = useContext(StateContextUI);

  const handleEditUserProfile = async (displayName: string) => {
    const resultEditUser = await editUserProfile(
      pond,
      stateUsersCatalogFish.users,
      stateUI.signedInUser,
      displayName
    );
    if (resultEditUser === true) {
      dispatch(closeSectionRight());
    }
  };

  return (
    <div>
      <UserProfileDetails editUserProfile={handleEditUserProfile} />
    </div>
  );
};
