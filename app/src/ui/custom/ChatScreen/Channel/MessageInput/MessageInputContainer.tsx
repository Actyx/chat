import { usePond } from '@actyx-contrib/react-pond';
import React, { useContext, useState } from 'react';
import { addMessageToChannel } from '../../../../../business-logic/channel-fish/logic';
import { Alert } from '../../../../common/Alert/Alert';
import { StateContextUI } from '../../../../state-manager/UIStateManager';
import { MessageInput } from './MessageInput';

type MessageInputContainerProps = Readonly<{
  channelName: string;
}>;

export const MessageInputContainer = ({
  channelName,
}: MessageInputContainerProps) => {
  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const pond = usePond();

  const stateUI = useContext(StateContextUI);

  const handleAddMessage = async (content: string) => {
    try {
      await addMessageToChannel(pond)(
        stateUI.activeChannelId,
        stateUI.userUUID
      )({
        content,
      });
    } catch (err) {
      setPondErrorMessage(err);
    }
  };
  return (
    <>
      {pondErrorMessage && (
        <div className="p-4">
          <Alert variant="danger">{pondErrorMessage}</Alert>
        </div>
      )}
      <MessageInput channelName={channelName} addMessage={handleAddMessage} />
    </>
  );
};
