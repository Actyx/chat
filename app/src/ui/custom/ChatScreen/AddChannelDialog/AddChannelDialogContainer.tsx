import { usePond } from '@actyx-contrib/react-pond';
import React, { useContext, useState } from 'react';
import { ChannelCatalogFish } from '../../../../business-logic/channel-catalog-fish/channel-catalog-fish';
import { addChannelLogic } from '../../../../business-logic/channel-catalog-fish/logic/addChannel';
import { wire } from '../../../../business-logic/common/logic-helpers';
import { mkUUID } from '../../../../business-logic/common/util';
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

  const performAddChannel = wire(
    pond,
    ChannelCatalogFish
  )(addChannelLogic(mkUUID));

  const handleAddChannel = async (name: string, description: string) => {
    performAddChannel(stateUI.userUUID, name, description)
      .then((result) => {
        if (result.type === 'ok') {
          handleHideDialog();
        } else {
          setInvalidMessage(getUIMessage(result.code));
        }
      })
      .catch(setPondErrorMessage);
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
