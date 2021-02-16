import React, { FC } from 'react';
import { AddChannel } from './AddChannel';

type Props = Readonly<{
  messageError?: string;
  messageInvalid?: string;
  addChannel: (name: string, description: string) => void;
  closeDialog: () => void;
}>;

export const AddChannelDialog: FC<Props> = ({
  messageError,
  messageInvalid,
  addChannel,
  closeDialog,
}) => {
  return (
    <div>
      {messageError}
      <AddChannel addChannel={addChannel} messageInvalid={messageInvalid} />
      <button onClick={closeDialog}>Close</button>
    </div>
  );
};
