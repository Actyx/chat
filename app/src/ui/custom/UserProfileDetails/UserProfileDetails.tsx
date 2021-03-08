import { useState } from 'react';
import { FlexPanel } from '../../common/FlexPanel/FlexPanel';
import { FormEventElement, InputChangeEvent } from '../../utils/ui-event-types';
import { TextField } from '../../common/TextField/TextField';
import { Button } from '../../common/Button/Button';
import { Label } from '../../common/Label/Label';
import { Typography } from '../../common/Typography/Typography';
import { Alert } from '../../common/Alert/Alert';

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
            change={handleChangeDisplayName}
          />
          <Typography size="sm" color="gray-medium">
            However you’d like people to refer to you.
          </Typography>
        </div>
        <div className="flex space-x-3">
          <Button type="button" size="sm" color="white" click={close}>
            Cancel
          </Button>
          <Button size="sm" color="green">
            Save changes
          </Button>
        </div>
        {isEditProfileSuccess === false && (
          <Alert variant="danger">Sorry cannot edit User's profile</Alert>
        )}
      </form>
    </FlexPanel>
  );
};
