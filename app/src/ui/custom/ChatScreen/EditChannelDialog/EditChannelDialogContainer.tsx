import { usePond } from '@actyx-contrib/react-pond';
import { useContext, useState } from 'react';
import { editChannel } from '../../../../business-logic/channel-catalog-fish/logic';
import { ChannelId } from '../../../../business-logic/message/types';
import { hideDialog } from '../../../state-manager/actions';
import {
  DispatchContextUI,
  StateContextUI,
} from '../../../state-manager/UIStateManager';
import { EditChannelDialog } from './EditChannelDialog';

type EditChannelDialogContainerProps = Readonly<{
  selectedChannelId?: ChannelId;
  currentName: string;
  currentDescription: string;
}>;

const INVALID_NAME = 'That name is already taken by a channel';

export const EditChannelDialogContainer = ({
  selectedChannelId,
  currentName,
  currentDescription,
}: EditChannelDialogContainerProps) => {
  const dispatch = useContext(DispatchContextUI);

  const stateUI = useContext(StateContextUI);

  const pond = usePond();

  const [invalidMessage, setInvalidMessage] = useState<string>();

  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const handleHideDialog = () => dispatch(hideDialog());

  const handleResetInvalidMessage = () => setInvalidMessage(undefined);

  const handleEditChannel = async (newName: string, newDescription: string) => {
    if (!selectedChannelId) {
      return;
    }
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

  return (
    <EditChannelDialog
      invalidMessage={invalidMessage}
      resetInvalidMessage={handleResetInvalidMessage}
      pondErrorMessage={pondErrorMessage}
      currentName={currentName}
      currentDescription={currentDescription}
      editChannel={handleEditChannel}
      closeDialog={handleHideDialog}
    />
  );
};
