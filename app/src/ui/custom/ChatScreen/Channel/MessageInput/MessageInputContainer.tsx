import { useState } from 'react';
import { usePond } from '@actyx-contrib/react-pond';
import { MessageInput } from './MessageInput';
import { addMessageToChannel } from '../../../../../business-logic/channel-fish/logic/addMessageToChannel';
import { wire } from '../../../../../business-logic/common/logic-wire';
import { mkChannelFish } from '../../../../../business-logic/channel-fish/channel-fish';
import { mkUUID } from '../../../../../business-logic/common/util';
import { useFish } from '../../../../utils/use-fish';
import { UserCatalogFish } from '../../../../../business-logic/user-catalog-fish/user-catalog-fish';
import { ChannelCatalogFish } from '../../../../../business-logic/channel-catalog-fish/channel-catalog-fish';
import { ChannelId } from '../../../../../business-logic/message/types';
import { UserUUID } from '../../../../../business-logic/user-catalog-fish/types';

type MessageInputContainerProps = Readonly<{
  activeChannelId: ChannelId;
  userUUID: UserUUID;
  channelName: string;
}>;

export const MessageInputContainer = ({
  activeChannelId,
  userUUID,
  channelName,
}: MessageInputContainerProps) => {
  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const pond = usePond();

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
    mkChannelFish(activeChannelId)
  )(addMessageToChannel(mkUUID));

  const handleAddMessage = async (content: string) =>
    performAddMessage({
      users: userCatalogFishState.users,
      channels: stateChannelsCatalogFish.channels,
      channelId: activeChannelId,
      userUUID: userUUID,
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
