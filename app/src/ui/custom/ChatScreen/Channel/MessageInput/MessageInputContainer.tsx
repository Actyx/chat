import { useContext, useState } from 'react';
import { usePond } from '@actyx-contrib/react-pond';
import { StateContextUI } from '../../../../state-manager/UIStateManager';
import { MessageInput } from './MessageInput';
import { addMessageToChannel } from '../../../../../business-logic/channel-fish/logic/addMessageToChannel';
import { wire } from '../../../../../business-logic/common/logic-wire';
import { mkChannelFish } from '../../../../../business-logic/channel-fish/channel-fish';
import { mkUUID } from '../../../../../business-logic/common/util';
import { useFish } from '../../../../utils/use-fish';
import { UserCatalogFish } from '../../../../../business-logic/user-catalog-fish/user-catalog-fish';
import { ChannelCatalogFish } from '../../../../../business-logic/channel-catalog-fish/channel-catalog-fish';

type MessageInputContainerProps = Readonly<{
  channelName: string;
}>;

export const MessageInputContainer = ({
  channelName,
}: MessageInputContainerProps) => {
  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const pond = usePond();

  const stateUI = useContext(StateContextUI);

  const userCatalogFishState = useFish(
    pond,
    UserCatalogFish,
    UserCatalogFish.initialState
  );

  const stateChannelsCatalogFish = useFish(
    pond,
    ChannelCatalogFish,
    ChannelCatalogFish.initialState
  );

  const performAddMessage = wire(
    pond,
    mkChannelFish(stateUI.activeChannelId)
  )(addMessageToChannel(mkUUID));

  const handleAddMessage = async (content: string) =>
    performAddMessage({
      users: userCatalogFishState.users,
      channels: stateChannelsCatalogFish.channels,
      channelId: stateUI.activeChannelId,
      userUUID: stateUI.userUUID,
      content,
    }).catch(setPondErrorMessage);

  return (
    <MessageInput
      channelName={channelName}
      pondErrorMessage={pondErrorMessage}
      addMessage={handleAddMessage}
    />
  );
};
