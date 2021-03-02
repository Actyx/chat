import { useState } from 'react';
import { FlexPanel } from '../common/FlexPanel/FlexPanel';
import { FormEventElement, InputChangeEvent } from '../utils/ui-event-types';
import { TextField } from '../common/Form/TextField/TextField';
import { Submit } from '../common/Form/Submit/Submit';

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
    <FlexPanel title="Edit User's Profile" close={close}>
      <form onSubmit={handleSubmit}>
        <label>displayName:</label>
        <TextField
          type="text"
          required
          value={displayName}
          full
          onChange={handleChangeDisplayName}
        />
        <Submit size="small" color="green-medium">
          Save changes
        </Submit>
        <br />
        {isEditProfileSuccess === undefined
          ? ''
          : isEditProfileSuccess === true
          ? 'success: user profile edited'
          : 'error: cannot edit user profile'}
      </form>
    </FlexPanel>
  );
};
