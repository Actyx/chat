import { usePond } from '@actyx-contrib/react-pond';
import React, { useContext, useState } from 'react';
import { ChannelCatalogFish } from '../../../../business-logic/channel-catalog-fish/channel-catalog-fish';
import { addChannel } from '../../../../business-logic/channel-catalog-fish/logic/addChannel';
import { wire } from '../../../../business-logic/common/logic-wire';
import { mkUUID } from '../../../../business-logic/common/util';
import { UserUUID } from '../../../../business-logic/user-catalog-fish/types';
import { UserCatalogFish } from '../../../../business-logic/user-catalog-fish/user-catalog-fish';
import { getUIMessage } from '../../../../l10n/l10n';
import { hideDialog } from '../../../state-manager/actions';
import { DispatchContext } from '../../../state-manager/dispatch';
import { useFish } from '../../../utils/use-fish';
import { AddChannelDialog } from './AddChannelDialog';

type AddChannelDialogContainerProps = Readonly<{
  userUUID: UserUUID;
}>;

export const AddChannelDialogContainer = ({
  userUUID,
}: AddChannelDialogContainerProps) => {
  const dispatch = useContext(DispatchContext);

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
    performAddChannel(userCatalogFishState.users, userUUID, name, description)
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
