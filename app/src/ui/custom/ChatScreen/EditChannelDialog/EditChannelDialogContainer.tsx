import { usePond } from '@actyx-contrib/react-pond';
import { useContext, useState } from 'react';
import { ChannelCatalogFish } from '../../../../business-logic/channel-catalog-fish/channel-catalog-fish';
import { getChannelProfileByChannelId } from '../../../../business-logic/channel-catalog-fish/logic-helpers';
import { editChannel } from '../../../../business-logic/channel-catalog-fish/logic/editChannel';
import { wire } from '../../../../business-logic/common/logic-wire';
import { ChannelId } from '../../../../business-logic/message/types';
import { UserUUID } from '../../../../business-logic/user-catalog-fish/types';
import { UserCatalogFish } from '../../../../business-logic/user-catalog-fish/user-catalog-fish';
import { getUIMessage } from '../../../../l10n/l10n';
import { hideDialog } from '../../../state-manager/actions';
import { DispatchContext } from '../../../state-manager/dispatch';
import { useFish } from '../../../utils/use-fish';
import { EditChannelDialog } from './EditChannelDialog';

type EditChannelDialogContainerProps = Readonly<{
  userUUID: UserUUID;
  selectedChannelId: ChannelId;
}>;

export const EditChannelDialogContainer = ({
  userUUID,
  selectedChannelId,
}: EditChannelDialogContainerProps) => {
  const dispatch = useContext(DispatchContext);

  const pond = usePond();

  const channelsCatalogFishState = useFish(
    pond,
    ChannelCatalogFish,
    ChannelCatalogFish.initialState
  );

  const userCatalogFishState = useFish(
    pond,
    UserCatalogFish,
    UserCatalogFish.initialState
  );

  const [invalidMessage, setInvalidMessage] = useState<string>();

  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const channelProfile = getChannelProfileByChannelId(
    selectedChannelId,
    channelsCatalogFishState.channels
  );

  const performEditChannel = wire(pond, ChannelCatalogFish)(editChannel);

  const handleHideDialog = () => dispatch(hideDialog());

  const handleResetInvalidMessage = () => setInvalidMessage(undefined);

  const handleEditChannel = async (newName: string, newDescription: string) => {
    performEditChannel(
      userCatalogFishState.users,
      userUUID,
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
