import { usePond } from '@actyx-contrib/react-pond';
import { useContext, useState } from 'react';
import { ChannelCatalogFish } from '../../../../business-logic/channel-catalog-fish/channel-catalog-fish';
import { getChannelProfileByChannelId } from '../../../../business-logic/channel-catalog-fish/logic-helpers';
import { editChannel } from '../../../../business-logic/channel-catalog-fish/logic/editChannel';
import { wire } from '../../../../business-logic/common/logic-helpers';
import { ChannelId } from '../../../../business-logic/message/types';
import { getUIMessage } from '../../../../l10n/l10n';
import { hideDialog } from '../../../state-manager/actions';
import {
  DispatchContextUI,
  StateContextUI,
} from '../../../state-manager/UIStateManager';
import { useFish } from '../../../utils/use-fish';
import { EditChannelDialog } from './EditChannelDialog';

type EditChannelDialogContainerProps = Readonly<{
  selectedChannelId: ChannelId;
}>;

export const EditChannelDialogContainer = ({
  selectedChannelId,
}: EditChannelDialogContainerProps) => {
  const dispatch = useContext(DispatchContextUI);

  const stateUI = useContext(StateContextUI);

  const pond = usePond();

  const [invalidMessage, setInvalidMessage] = useState<string>();

  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const handleHideDialog = () => dispatch(hideDialog());

  const handleResetInvalidMessage = () => setInvalidMessage(undefined);

  const stateChannelsCatalogFish = useFish(
    pond,
    ChannelCatalogFish,
    ChannelCatalogFish.initialState
  );

  const channelProfile = getChannelProfileByChannelId(
    selectedChannelId,
    stateChannelsCatalogFish.channels
  );

  const performEditChannel = wire(pond, ChannelCatalogFish)(editChannel);

  const handleEditChannel = async (newName: string, newDescription: string) => {
    performEditChannel(
      stateUI.userUUID,
      selectedChannelId,
      newName,
      newDescription
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

  return channelProfile ? (
    <EditChannelDialog
      invalidMessage={invalidMessage}
      resetInvalidMessage={handleResetInvalidMessage}
      pondErrorMessage={pondErrorMessage}
      currentName={channelProfile.name}
      currentDescription={channelProfile.description ?? ''}
      editChannel={handleEditChannel}
      closeDialog={handleHideDialog}
    />
  ) : null;
};
