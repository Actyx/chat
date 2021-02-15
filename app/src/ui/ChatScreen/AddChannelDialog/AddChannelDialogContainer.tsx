import { Pond } from '@actyx/pond';
import React, { FC, useContext } from 'react';
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

  const [errorPond, setErrorPond] = React.useState<string>();

  const handleAddChannel = async (name: string, description: string) => {
    try {
      await addChannel(pond)(
        stateUI.signedInUserUUID! // FIXME
      )(name, description);
      setErrorPond(undefined);
      dispatch(closeDialog());
    } catch (err) {
      setErrorPond(err);
    }
  };

  return (
    <div>
      {errorPond}
      <AddChannel addChannel={handleAddChannel} />
    </div>
  );
};
