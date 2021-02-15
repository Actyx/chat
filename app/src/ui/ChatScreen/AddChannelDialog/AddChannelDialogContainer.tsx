import { Pond } from '@actyx/pond';
import React, { FC, useContext, useState } from 'react';
import { addChannel } from '../../../business-logic/channels-catalog-fish/logic';
import { closeDialog } from '../../ui-state-manager/actions';
import {
  DispatchContextUI,
  StateContextUI,
} from '../../ui-state-manager/UIStateManager';
import { AddChannel } from './AddChannel';

type Props = Readonly<{
  pond: Pond;
}>;

export const AddChannelDialog: FC<Props> = ({ pond }) => {
  const dispatch = useContext(DispatchContextUI);

  const stateUI = useContext(StateContextUI);

  const [messageInvalid, setMessageInvalid] = useState<string>();

  const [errorPond, setErrorPond] = React.useState<string>();

  const handleAddChannel = async (name: string, description: string) => {
    try {
      const isSuccess = await addChannel(pond)(
        stateUI.signedInUserUUID! // FIXME
      )(name, description);
      if (isSuccess) {
        setErrorPond(undefined);
        setMessageInvalid(undefined);
        dispatch(closeDialog());
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
    </div>
  );
};
