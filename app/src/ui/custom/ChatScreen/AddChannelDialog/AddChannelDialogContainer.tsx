import { usePond } from '@actyx-contrib/react-pond';
import React, { useContext, useState } from 'react';
import { addChannelWireForUi } from '../../../../business-logic/channel-catalog-fish/wire';
import { getUIMessage } from '../../../../l10n/l10n';
import { hideDialog } from '../../../state-manager/actions';
import {
  DispatchContextUI,
  StateContextUI,
} from '../../../state-manager/UIStateManager';
import { AddChannelDialog } from './AddChannelDialog';

export const AddChannelDialogContainer = () => {
  const dispatch = useContext(DispatchContextUI);

  const pond = usePond();

  const stateUI = useContext(StateContextUI);

  const [invalidMessage, setInvalidMessage] = useState<string>();

  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const handleHideDialog = () => dispatch(hideDialog());

  const handleResetInvalidMessage = () => setInvalidMessage(undefined);

  const handleAddChannel = async (name: string, description: string) => {
    try {
      const result = await addChannelWireForUi(pond)(stateUI.userUUID)(
        name,
        description
      );
      if (result.type === 'ok') {
        handleHideDialog();
      } else {
        setInvalidMessage(getUIMessage(result.code));
      }
    } catch (err) {
      setPondErrorMessage(err);
    }
  };

  return (
    <AddChannelDialog
      invalidMessage={invalidMessage}
      pondErrorMessage={pondErrorMessage}
      resetInvalidMessage={handleResetInvalidMessage}
      closeDialog={handleHideDialog}
      addChannel={handleAddChannel}
    />
  );
};
