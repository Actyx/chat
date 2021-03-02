import { useState } from 'react';
import { FlexPanel } from '../common/FlexPanel/FlexPanel';
import { FormEventElement, InputChangeEvent } from '../utils/ui-event-types';
import { TextField } from '../common/Form/TextField/TextField';
import { Submit } from '../common/Form/Submit/Submit';
import { Label } from '../common/Form/Label/Label';
import { Typography } from '../common/Typography/Typography';

const FIELD_DISPLAY_NAME_ID = 'user-profile-details-display-name';

type UserProfileDetailsProps = Readonly<{
  userDisplayName: string;
  isEditProfileSuccess?: boolean;
  editUserProfile: (displayName: string) => void;
  close: () => void;
}>;

export const UserProfileDetails = ({
  userDisplayName,
  isEditProfileSuccess,
  editUserProfile,
  close,
}: UserProfileDetailsProps) => {
  const [displayName, setDisplayName] = useState<string>(userDisplayName);

  const handleChangeDisplayName = (e: InputChangeEvent) =>
    setDisplayName(e.target.value);

  const handleSubmit = (e: FormEventElement) => {
    editUserProfile(displayName);
    e.preventDefault();
  };

  return (
    <FlexPanel title="Edit User's Profile" close={close}>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor={FIELD_DISPLAY_NAME_ID}>Display Name</Label>
          <TextField
            id={FIELD_DISPLAY_NAME_ID}
            type="text"
            required
            value={displayName}
            full
            onChange={handleChangeDisplayName}
          />
          <Typography size="sm" color="gray-medium">
            However you’d like people to refer to you.
          </Typography>
        </div>
        <div className="flex space-x-3">
          <Submit variant="button" size="small" color="white" click={close}>
            Cancel
          </Submit>
          <Submit size="small" color="green">
            Save changes
          </Submit>
        </div>
      </form>
      {isEditProfileSuccess === undefined
        ? ''
        : isEditProfileSuccess === true
        ? 'success: user profile edited'
        : 'error: cannot edit user profile'}
    </FlexPanel>
  );
};
