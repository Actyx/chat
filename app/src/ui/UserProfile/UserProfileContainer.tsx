import { Pond } from '@actyx/pond';
import React, { FC } from 'react';
import { editUserProfile } from '../../business-logic/users-catalog-fish/logic';
import {
  UsersCatalogFishState,
  UserUUID,
} from '../../business-logic/users-catalog-fish/types';
import { UserProfileDetails } from './UserProfileDetails';

type Props = Readonly<{
  pond: Pond;
  stateUsersCatalogFish: UsersCatalogFishState;
}>;

export const UserProfileContainer: FC<Props> = ({
  pond,
  stateUsersCatalogFish,
}) => {
  const [
    isEditProfileSuccess,
    setIsEditProfileSuccess,
  ] = React.useState<boolean>();

  const handleSubmit = async (userUUID: UserUUID, displayName: string) => {
    const resultEditUser = await editUserProfile(
      pond,
      stateUsersCatalogFish.users,
      userUUID,
      displayName
    );
    setIsEditProfileSuccess(resultEditUser);
  };

  return (
    <div>
      <UserProfileDetails
        isEditProfileSuccess={isEditProfileSuccess}
        editUserProfile={handleSubmit}
      />
    </div>
  );
};
