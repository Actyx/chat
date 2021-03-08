import React, { useContext, useState } from 'react';
import { Body } from '../../../common/Dialog/Body';
import { Dialog } from '../../../common/Dialog/Dialog';
import { Footer } from '../../../common/Dialog/Footer';
import { Header } from '../../../common/Dialog/Header';
import { Label } from '../../../common/Label/Label';
import { TextField } from '../../../common/TextField/TextField';
import { hideDialog } from '../../../ui-state-manager/actions';
import { DispatchContextUI } from '../../../ui-state-manager/UIStateManager';
import { InputChangeEvent } from '../../../utils/ui-event-types';

type EditChannelDialogProps = Readonly<{
  currentName: string;
  currentDescription: string;
  messageError?: string;
  messageInvalid?: string;
  editChannel: (name: string, description: string) => void;
  closeDialog: () => void;
}>;

const FIELD_NAME = 'edit-channel-dialog-textfield-name';
const FIELD_DESCRIPTION = 'edit-channel-dialog-textfield-description';

export const EditChannelDialog = ({
  currentName,
  currentDescription,
  messageError,
  messageInvalid,
  editChannel,
  closeDialog,
}: EditChannelDialogProps) => {
  const dispatch = useContext(DispatchContextUI);

  const [name, setName] = useState<string>(currentName);

  const [description, setDescription] = useState<string>(currentDescription);

  const handleChangeName = (e: InputChangeEvent) => setName(e.target.value);

  const handleChangeDescription = (e: InputChangeEvent) =>
    setDescription(e.target.value);

  const handleEditChannel = () => {
    editChannel(name, description);
    dispatch(hideDialog());
  };

  return (
    <Dialog
      header={<Header title="Edit channel" close={closeDialog} />}
      body={
        <Body>
          <div className="space-y-6">
            <form className="space-y-4" onSubmit={handleEditChannel}>
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
            </form>
            {messageError}
            {messageInvalid}
          </div>
        </Body>
      }
      footer={<Footer textConfirm="Edit" confirm={handleEditChannel} />}
      close={closeDialog}
    ></Dialog>
  );
};
