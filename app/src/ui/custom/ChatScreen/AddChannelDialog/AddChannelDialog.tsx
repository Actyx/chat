import React, { useState } from 'react';
import { Dialog } from '../../../common/Dialog/Dialog';
import { Header } from '../../../common/Dialog/Header';
import { Body } from '../../../common/Dialog/Body';
import {
  InputChangeEvent,
  InputClickEvent,
} from '../../../utils/ui-event-types';
import { Footer } from '../../../common/Dialog/Footer';
import { Label } from '../../../common/Label/Label';
import { TextField } from '../../../common/TextField/TextField';
import { Typography } from '../../../common/Typography/Typography';
import { Alert } from '../../../common/Alert/Alert';
import { PondErrorMessage } from '../../PondErrorMessage/PondErrorMessage';

type AddChannelDialogProps = Readonly<{
  errorMessage?: string;
  addChannel: (name: string, description: string) => Promise<boolean>;
  closeDialog: () => void;
}>;

const FIELD_NAME = 'add-channel-dialog-textfield-name';
const FIELD_DESCRIPTION = 'add-channel-dialog-textfield-description';

const INVALID_NAME = 'That name is already taken by a channel';

export const AddChannelDialog = ({
  addChannel,
  closeDialog,
}: AddChannelDialogProps) => {
  const [invalidMessage, setInvalidMessage] = useState<string>();

  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const [name, setName] = useState<string>('');

  const [description, setDescription] = useState<string>('');

  const handleChangeName = (e: InputChangeEvent) => setName(e.target.value);

  const handleChangeDescription = (e: InputChangeEvent) =>
    setDescription(e.target.value);

  const handleAddChannel = async () => {
    try {
      const isSuccess = await addChannel(name, description);
      if (isSuccess) {
        closeDialog();
      } else {
        setInvalidMessage(INVALID_NAME);
      }
    } catch (err) {
      setPondErrorMessage(err);
    }
  };

  const handleClick = (e: InputClickEvent) => {
    e.stopPropagation();
  };

  return (
    <Dialog
      close={closeDialog}
      header={<Header title="Create a channel" close={closeDialog} />}
      body={
        <Body>
          <div className="space-y-6">
            <Typography color="gray-medium">
              Channels are where your team communicates. They’re best when
              organized around a topic — #marketing, for example.
            </Typography>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={FIELD_NAME}>Name</Label>
                <TextField
                  id={FIELD_NAME}
                  type="text"
                  required
                  full
                  value={name}
                  placeholder="e.g. plan-budget"
                  change={handleChangeName}
                  click={handleClick}
                />
              </div>
              <div className="space-y-2">
                <div className="space-x-1">
                  <Label htmlFor={FIELD_DESCRIPTION}>Description</Label>
                  <Typography color="gray-medium">(optional)</Typography>
                </div>
                <TextField
                  id={FIELD_DESCRIPTION}
                  type="text"
                  full
                  value={description}
                  change={handleChangeDescription}
                  click={handleClick}
                />
                <Typography size="sm" color="gray-medium">
                  What’s this channel about?
                </Typography>
              </div>
              {invalidMessage && (
                <Alert variant="warning">{invalidMessage}</Alert>
              )}
              {pondErrorMessage && (
                <PondErrorMessage variant="danger" message={pondErrorMessage} />
              )}
            </form>
          </div>
        </Body>
      }
      footer={<Footer textConfirm="Create" confirm={handleAddChannel} />}
    ></Dialog>
  );
};
