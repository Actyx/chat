import { usePond } from '@actyx-contrib/react-pond';
import { useContext, useState } from 'react';
import { ChannelCatalogFish } from '../../../../business-logic/channel-catalog-fish/channel-catalog-fish';
import { editChannel } from '../../../../business-logic/channel-catalog-fish/logic';
import { getChannelProfileByChannelId } from '../../../../business-logic/channel-catalog-fish/logic-helpers';
import { ChannelId } from '../../../../business-logic/message/types';
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

const INVALID_NAME = 'That name is already taken by a channel';

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

  const handleEditChannel = async (newName: string, newDescription: string) => {
    try {
      const isSuccess = await editChannel(pond)(
        stateUI.userUUID,
        selectedChannelId
      )(newName, newDescription);
      if (isSuccess) {
        handleHideDialog();
      } else {
        setInvalidMessage(INVALID_NAME);
      }
    } catch (err) {
      setPondErrorMessage(err);
    }
  };

  const stateChannelsCatalogFish = useFish(
    pond,
    ChannelCatalogFish,
    ChannelCatalogFish.initialState
  );

  const channelProfile = getChannelProfileByChannelId(
    selectedChannelId,
    stateChannelsCatalogFish.channels
  );

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
