import { Pond } from '@actyx/pond';
import React, { FC, useState } from 'react';
import { addChannel } from '../../business-logic/channels-catalog-fish/logic';
import { UserUUID } from '../../business-logic/users-catalog-fish/types';
import { AddChannel } from './AddChannelDialog/AddChannel';

type Props = Readonly<{
  pond: Pond;
  signedInUserUUID: UserUUID;
  closeDialog: () => void;
}>;

export const AddChannelDialog: FC<Props> = ({
  pond,
  signedInUserUUID,
  closeDialog,
}) => {
  const [messageInvalid, setMessageInvalid] = useState<string>();

  const [errorPond, setErrorPond] = React.useState<string>();

  const handleAddChannel = async (name: string, description: string) => {
    try {
      const isSuccess = await addChannel(pond)(signedInUserUUID)(
        name,
        description
      );
      if (isSuccess) {
        setErrorPond(undefined);
        setMessageInvalid(undefined);
        closeDialog();
      } else {
        setMessageInvalid(`That name is already taken by a channel`);
      }
    } catch (err) {
      setMessageInvalid(undefined);
      setErrorPond(err);
    }
  };

  return (
    <div>
      {errorPond}
      <AddChannel
        addChannel={handleAddChannel}
        messageInvalid={messageInvalid}
      />
      <button onClick={closeDialog}>Close</button>
    </div>
  );
};
