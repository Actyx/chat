import React, { useContext, useState } from 'react';
import { Dialog } from '../../../common/Dialog/Dialog';
import { Header } from '../../../common/Dialog/Header';
import { Body } from '../../../common/Dialog/Body';
import { InputChangeEvent } from '../../../utils/ui-event-types';
import { Footer } from '../../../common/Dialog/Footer';
import { DispatchContextUI } from '../../../ui-state-manager/UIStateManager';
import { hideDialog } from '../../../ui-state-manager/actions';
import { Label } from '../../../common/Label/Label';
import { TextField } from '../../../common/TextField/TextField';
import { Typography } from '../../../common/Typography/Typography';
import { Alert } from '../../../common/Alert/Alert';

type AddChannelDialogProps = Readonly<{
  errorMessage?: string;
  invalidMessage?: string;
  addChannel: (name: string, description: string) => void;
  closeDialog: () => void;
}>;

const FIELD_NAME = 'add-channel-dialog-textfield-name';
const FIELD_DESCRIPTION = 'add-channel-dialog-textfield-description';

export const AddChannelDialog = ({
  errorMessage,
  invalidMessage,
  addChannel,
  closeDialog,
}: AddChannelDialogProps) => {
  const dispatch = useContext(DispatchContextUI);

  const [name, setName] = useState<string>('');

  const [description, setDescription] = useState<string>('');

  const handleChangeName = (e: InputChangeEvent) => setName(e.target.value);

  const handleChangeDescription = (e: InputChangeEvent) =>
    setDescription(e.target.value);

  const handleAddChannel = () => {
    addChannel(name, description);
    dispatch(hideDialog());
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
                />
                <Typography size="sm" color="gray-medium">
                  What’s this channel about?
                </Typography>
              </div>
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              {invalidMessage && (
                <Alert variant="danger">{invalidMessage}</Alert>
              )}
            </form>
          </div>
        </Body>
      }
      footer={<Footer textConfirm="Create" confirm={handleAddChannel} />}
    ></Dialog>
  );
};
