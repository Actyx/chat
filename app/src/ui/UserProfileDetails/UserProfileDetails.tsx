import { useState } from 'react';
import { FormEventElement, InputChangeEvent } from '../utils/ui-event-types';

type UserProfileDetailsProps = Readonly<{
  isEditProfileSuccess?: boolean;
  editUserProfile: (displayName: string) => void;
  close: () => void;
}>;

export const UserProfileDetails = ({
  isEditProfileSuccess,
  editUserProfile,
  close,
}: UserProfileDetailsProps) => {
  const [displayName, setDisplayName] = useState<string>('');

  const handleChangeDisplayName = (e: InputChangeEvent) =>
    setDisplayName(e.target.value);

  const handleSubmit = (e: FormEventElement) => {
    editUserProfile(displayName);
    e.preventDefault();
  };

  return (
    <div className="w-96 border-solid border-l border-gray-300">
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
      <button onClick={close}>Close</button>
    </div>
  );
};
