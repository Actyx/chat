import React, { useState } from 'react';
import { FlexPanel } from '../../common/FlexPanel/FlexPanel';
import { FormEventElement, InputChangeEvent } from '../../utils/element-events';
import { TextField } from '../../common/TextField/TextField';
import { Button } from '../../common/Button/Button';
import { Label } from '../../common/Label/Label';
import { Typography } from '../../common/Typography/Typography';
import { Alert } from '../../common/Alert/Alert';

type UserProfileDetailsProps = Readonly<{
  invalidMessage?: string;
  pondErrorMessage?: string;
  userDisplayName: string;
  editUserProfile: (displayName: string) => void;
  close: () => void;
}>;

const FIELD_DISPLAY_NAME_ID = 'user-profile-details-display-name';

export const UserProfileDetails = ({
  invalidMessage,
  pondErrorMessage,
  userDisplayName,
  editUserProfile,
  close,
}: UserProfileDetailsProps) => {
  const [displayName, setDisplayName] = useState<string>(userDisplayName);

  const handleChangeDisplayName = (e: InputChangeEvent) =>
    setDisplayName(e.target.value);

  const handleSubmit = async (e: FormEventElement) => {
    e.preventDefault();
    editUserProfile(displayName);
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
        {invalidMessage && <Alert variant="warning">{invalidMessage}</Alert>}
        {pondErrorMessage && <Alert variant="danger">{pondErrorMessage}</Alert>}
      </form>
    </FlexPanel>
  );
};
