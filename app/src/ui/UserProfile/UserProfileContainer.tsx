import { Pond } from '@actyx/pond';
import React, { FC } from 'react';
import { editUserProfile } from '../../business-logic/users-catalog-fish/logic';
import {
  UsersCatalogFishState,
  UserUniqueIdentifier,
} from '../../business-logic/users-catalog-fish/types';

type Props = Readonly<{
  pond: Pond;
  fishState: UsersCatalogFishState;
}>;

export const UserProfileContainer: FC<Props> = ({ pond, fishState }) => {
  const [
    userUniqueIdentifier,
    setUserUniqueIdentifier,
  ] = React.useState<UserUniqueIdentifier>('');
  const [displayName, setDisplayName] = React.useState<string>('');
  const [
    isEditUserProfileSuccess,
    setIsEditUserProfileSuccess,
  ] = React.useState<boolean | undefined>();

  const handleChangeUserUniqueIdentifier = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setUserUniqueIdentifier(e.target.value);

  const handleChangeDisplayName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDisplayName(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const resultEditUserProfile = editUserProfile(
      pond,
      fishState.users,
      userUniqueIdentifier,
      displayName
    );
    if (resultEditUserProfile.success) {
      setIsEditUserProfileSuccess(true);
    } else {
      setIsEditUserProfileSuccess(false);
    }
    e.preventDefault();
  };

  return (
    <div>
      <h2>Edit user profile </h2>
      <form onSubmit={handleSubmit}>
        <label>userUniqueIdentifier:</label>
        <input
          type="text"
          required
          value={userUniqueIdentifier}
          onChange={handleChangeUserUniqueIdentifier}
        />
        <br />
        <label>displayName:</label>
        <input
          type="text"
          value={displayName}
          onChange={handleChangeDisplayName}
        />
        <br />
        <input type="submit" value="Sign-in" />
        <br />
        {isEditUserProfileSuccess === undefined
          ? ''
          : isEditUserProfileSuccess === true
          ? 'success: user profile edited'
          : 'error: cannot edit user profile'}
      </form>
    </div>
  );
};
