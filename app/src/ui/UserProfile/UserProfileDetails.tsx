import React, { FC } from 'react';
import { UserUUID } from '../../business-logic/users-catalog-fish/types';

type Props = Readonly<{
  isEditProfileSuccess?: boolean;
  editUserProfile: (userUUID: UserUUID, displayName: string) => void;
}>;

export const UserProfileDetails: FC<Props> = ({
  isEditProfileSuccess,
  editUserProfile,
}) => {
  const [userUUID, setUserUUID] = React.useState<UserUUID>('');

  const [displayName, setDisplayName] = React.useState<string>('');

  const handleChangeUserUUID = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserUUID(e.target.value);

  const handleChangeDisplayName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDisplayName(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    editUserProfile(userUUID, displayName);
    e.preventDefault();
  };

  return (
    <div>
      <h2>Edit user profile </h2>
      <form onSubmit={handleSubmit}>
        <label>userUUID:</label>
        <input
          type="text"
          required
          value={userUUID}
          onChange={handleChangeUserUUID}
        />
        <br />
        <label>displayName:</label>
        <input
          type="text"
          required
          value={displayName}
          onChange={handleChangeDisplayName}
        />
        <br />
        <input type="submit" value="Edit display name" />
        <br />
        {isEditProfileSuccess === undefined
          ? ''
          : isEditProfileSuccess === true
          ? 'success: user profile edited'
          : 'error: cannot edit user profile'}
      </form>
    </div>
  );
};
