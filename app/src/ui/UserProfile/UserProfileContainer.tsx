import { Pond } from '@actyx/pond';
import React, { FC } from 'react';
import { editUserProfile } from '../../business-logic/users-catalog-fish/logic';
import {
  UsersCatalogFishState,
  UserUniqueIdentifier,
} from '../../business-logic/users-catalog-fish/types';
import { UserProfileDetails } from './UserProfileDetails';

type Props = Readonly<{
  pond: Pond;
  fishState: UsersCatalogFishState;
}>;

export const UserProfileContainer: FC<Props> = ({ pond, fishState }) => {
  const [
    isEditProfileSuccess,
    setIsEditProfileSuccess,
  ] = React.useState<boolean>();

  const handleSubmit = (
    userUniqueIdentifier: UserUniqueIdentifier,
    displayName: string
  ) => {
    const resultEditUser = editUserProfile(
      pond,
      fishState.users,
      userUniqueIdentifier,
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
