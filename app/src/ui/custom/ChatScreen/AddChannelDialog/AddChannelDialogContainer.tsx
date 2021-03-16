import { usePond } from '@actyx-contrib/react-pond';
import React, { useContext, useState } from 'react';
import { ChannelCatalogFish } from '../../../../business-logic/channel-catalog-fish/channel-catalog-fish';
import { addChannelLogic } from '../../../../business-logic/channel-catalog-fish/logic';
import {
  ChannelCatalogFishEvent,
  ChannelCatalogFishState,
} from '../../../../business-logic/channel-catalog-fish/types';
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

  const wireBl = wire<ChannelCatalogFishState, ChannelCatalogFishEvent, void>(
    pond
  )(ChannelCatalogFish);

  const handleAddChannel = async (name: string, description: string) => {
    try {
      const resultLogic = await wireBl(
        addChannelLogic(mkUUID)(stateUI.userUUID, name, description)
      )();
      if (resultLogic.type === 'ok') {
        handleHideDialog();
      } else {
        setInvalidMessage(getUIMessage(resultLogic.code));
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
