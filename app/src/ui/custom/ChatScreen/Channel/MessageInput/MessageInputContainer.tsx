import { useContext, useState } from 'react';
import { usePond } from '@actyx-contrib/react-pond';
import { StateContextUI } from '../../../../state-manager/UIStateManager';
import { MessageInput } from './MessageInput';
import { addMessageToChannel } from '../../../../../business-logic/channel-fish/logic/addMessageToChannel';
import { wire } from '../../../../../business-logic/common/logic-helpers';
import { mkChannelFish } from '../../../../../business-logic/channel-fish/channel-fish';
import { mkUUID } from '../../../../../business-logic/common/util';

type MessageInputContainerProps = Readonly<{
  channelName: string;
}>;

export const MessageInputContainer = ({
  channelName,
}: MessageInputContainerProps) => {
  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const pond = usePond();

  const stateUI = useContext(StateContextUI);

  const performAddMessage = wire(
    pond,
    mkChannelFish(stateUI.activeChannelId)
  )(addMessageToChannel(mkUUID));

  const handleAddMessage = async (content: string) =>
    performAddMessage(
      stateUI.activeChannelId,
      stateUI.userUUID,
      content,
      undefined,
      undefined
    ).catch(setPondErrorMessage);

  return (
    <MessageInput
      channelName={channelName}
      pondErrorMessage={pondErrorMessage}
      addMessage={handleAddMessage}
    />
  );
};
