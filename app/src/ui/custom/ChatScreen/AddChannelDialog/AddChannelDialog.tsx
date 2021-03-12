import React, { useState } from 'react';
import { Dialog } from '../../../common/Dialog/Dialog';
import { Header } from '../../../common/Dialog/Header';
import { Body } from '../../../common/Dialog/Body';
import {
  FormEventElement,
  InputChangeEvent,
} from '../../../utils/element-events';
import { Footer } from '../../../common/Dialog/Footer';
import { Label } from '../../../common/Label/Label';
import { TextField } from '../../../common/TextField/TextField';
import { Typography } from '../../../common/Typography/Typography';
import { Alert } from '../../../common/Alert/Alert';
import { AddChannelLogicResult } from '../../../../business-logic/channel-catalog-fish/types';
import { messages } from '../../../../l10n/messages';
import { Language } from '../../../../l10n/types';
import { getMessage } from '../../../../l10n/l10n';

type AddChannelDialogProps = Readonly<{
  errorMessage?: string;
  addChannel: (
    name: string,
    description: string
  ) => Promise<AddChannelLogicResult>;
  closeDialog: () => void;
}>;

const FIELD_NAME = 'add-channel-dialog-textfield-name';
const FIELD_DESCRIPTION = 'add-channel-dialog-textfield-description';

const getUIMessage = getMessage(messages)(Language.En);

export const AddChannelDialog = ({
  addChannel,
  closeDialog,
}: AddChannelDialogProps) => {
  const [invalidMessage, setInvalidMessage] = useState<string>();

  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const [name, setName] = useState<string>('');

  const [description, setDescription] = useState<string>('');

  const handleChangeName = (e: InputChangeEvent) => {
    if (invalidMessage) {
      setInvalidMessage(undefined);
    }
    setName(e.target.value);
  };

  const handleChangeDescription = (e: InputChangeEvent) =>
    setDescription(e.target.value);

  const handleAddChannel = async () => {
    try {
      const result = await addChannel(name, description);
      if (result.type === 'ok') {
        closeDialog();
      } else {
        setInvalidMessage(getUIMessage(result.code));
      }
    } catch (err) {
      setPondErrorMessage(err);
    }
  };

  const handleSumbit = (e: FormEventElement) => {
    e.preventDefault();
    e.stopPropagation();
    handleAddChannel();
  };

  return (
    <form onSubmit={handleSumbit}>
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
              {invalidMessage && (
                <Alert variant="warning">{invalidMessage}</Alert>
              )}
              {pondErrorMessage && (
                <Alert variant="danger">{pondErrorMessage}</Alert>
              )}
            </div>
          </Body>
        }
        footer={<Footer textConfirm="Create" confirm={handleAddChannel} />}
      ></Dialog>
    </form>
  );
};
