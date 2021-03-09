import React, { useState } from 'react';
import { Alert } from '../../../common/Alert/Alert';
import { Body } from '../../../common/Dialog/Body';
import { Dialog } from '../../../common/Dialog/Dialog';
import { Footer } from '../../../common/Dialog/Footer';
import { Header } from '../../../common/Dialog/Header';
import { Label } from '../../../common/Label/Label';
import { TextField } from '../../../common/TextField/TextField';
import {
  FormEventElement,
  InputChangeEvent,
} from '../../../utils/ui-event-types';

type EditChannelDialogProps = Readonly<{
  currentName: string;
  currentDescription: string;
  editChannel: (name: string, description: string) => Promise<boolean>;
  closeDialog: () => void;
}>;

const FIELD_NAME = 'edit-channel-dialog-textfield-name';
const FIELD_DESCRIPTION = 'edit-channel-dialog-textfield-description';

const INVALID_NAME = 'That name is already taken by a channel';

export const EditChannelDialog = ({
  currentName,
  currentDescription,
  editChannel,
  closeDialog,
}: EditChannelDialogProps) => {
  const [invalidMessage, setInvalidMessage] = useState<string>();

  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const [name, setName] = useState<string>(currentName);

  const [description, setDescription] = useState<string>(currentDescription);

  const handleChangeName = (e: InputChangeEvent) => {
    if (invalidMessage) {
      setInvalidMessage(undefined);
    }
    setName(e.target.value);
  };

  const handleChangeDescription = (e: InputChangeEvent) =>
    setDescription(e.target.value);

  const handleEditChannel = async () => {
    try {
      const isSuccess = await editChannel(name, description);
      if (isSuccess) {
        closeDialog();
      } else {
        setInvalidMessage(INVALID_NAME);
      }
    } catch (err) {
      setPondErrorMessage(err);
    }
  };

  const handleSumbit = (e: FormEventElement) => {
    e.preventDefault();
    e.stopPropagation();
    handleEditChannel();
  };

  return (
    <form className="space-y-4" onSubmit={handleSumbit}>
      <Dialog
        header={<Header title="Edit channel" close={closeDialog} />}
        body={
          <Body>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor={FIELD_NAME}>Name</Label>
                <TextField
                  type="text"
                  required
                  value={name}
                  full
                  change={handleChangeName}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={FIELD_DESCRIPTION}>Description</Label>
                <TextField
                  type="text"
                  value={description}
                  full
                  change={handleChangeDescription}
                />
              </div>
              {invalidMessage && (
                <Alert variant="warning">{invalidMessage}</Alert>
              )}
              {pondErrorMessage && (
                <Alert variant="danger">{pondErrorMessage}</Alert>
              )}
            </div>
          </Body>
        }
        footer={<Footer textConfirm="Edit" confirm={handleEditChannel} />}
        close={closeDialog}
      ></Dialog>
    </form>
  );
};
