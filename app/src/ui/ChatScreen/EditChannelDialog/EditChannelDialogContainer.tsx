import { Pond } from '@actyx/pond';
import React, { FC, useContext, useState } from 'react';
import { addChannel } from '../../../business-logic/channels-catalog-fish/logic';
import { StateContextUI } from '../../ui-state-manager/UIStateManager';
import { EditChannel } from './EditChannel';

type Props = Readonly<{
  pond: Pond;
  closeDialog: () => void;
}>;

export const EditChannelDialogContainer: FC<Props> = ({
  pond,
  closeDialog,
}) => {
  const stateUI = useContext(StateContextUI);

  const [messageInvalid, setMessageInvalid] = useState<string>();

  const [errorPond, setErrorPond] = React.useState<string>();

  const handleEditChannel = async (name: string, description: string) => {
    // FIXME all this code here
    try {
      const isSuccess = await addChannel(pond)(stateUI.signedInUserUUID)(
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
      <EditChannel
        editChannel={handleEditChannel}
        messageInvalid={messageInvalid}
      />
      <button onClick={closeDialog}>Close</button>
    </div>
  );
};
