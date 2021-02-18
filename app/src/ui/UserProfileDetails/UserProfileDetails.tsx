import React, { FC } from 'react';
import { FormEvent, InputChangeEvent } from '../../common/ui-types';

type Props = Readonly<{
  isEditProfileSuccess?: boolean;
  editUserProfile: (displayName: string) => void;
}>;

export const UserProfileDetails: FC<Props> = ({
  isEditProfileSuccess,
  editUserProfile,
}) => {
  const [displayName, setDisplayName] = React.useState<string>('');

  const handleChangeDisplayName = (e: InputChangeEvent) =>
    setDisplayName(e.target.value);

  const handleSubmit = (e: FormEvent) => {
    editUserProfile(displayName);
    e.preventDefault();
  };

  return (
    <div>
      <h2>Edit user profile </h2>
      <form onSubmit={handleSubmit}>
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
