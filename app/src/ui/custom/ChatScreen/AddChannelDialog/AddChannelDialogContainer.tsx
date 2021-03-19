import { usePond } from '@actyx-contrib/react-pond';
import React, { useContext, useState } from 'react';
import { ChannelCatalogFish } from '../../../../business-logic/channel-catalog-fish/channel-catalog-fish';
import { addChannel } from '../../../../business-logic/channel-catalog-fish/logic/addChannel';
import { wire } from '../../../../business-logic/common/logic-wire';
import { mkUUID } from '../../../../business-logic/common/util';
import { UserCatalogFish } from '../../../../business-logic/user-catalog-fish/user-catalog-fish';
import { getUIMessage } from '../../../../l10n/l10n';
import { hideDialog } from '../../../state-manager/actions';
import { StateUIAuthenticated } from '../../../state-manager/state-types';
import {
  DispatchContextUI,
  StateContextUI,
} from '../../../state-manager/UIStateManager';
import { useFish } from '../../../utils/use-fish';
import { AddChannelDialog } from './AddChannelDialog';

export const AddChannelDialogContainer = () => {
  const dispatch = useContext(DispatchContextUI);

  const stateUI = useContext(StateContextUI) as StateUIAuthenticated;

  const pond = usePond();

  const userCatalogFishState = useFish(
    pond,
    UserCatalogFish,
    UserCatalogFish.initialState
  );

  const [invalidMessage, setInvalidMessage] = useState<string>();

  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const handleHideDialog = () => dispatch(hideDialog());

  const handleResetInvalidMessage = () => setInvalidMessage(undefined);

  const performAddChannel = wire(pond, ChannelCatalogFish)(addChannel(mkUUID));

  const handleAddChannel = async (name: string, description: string) => {
    performAddChannel(
      userCatalogFishState.users,
      stateUI.userUUID,
      name,
      description
    )
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
