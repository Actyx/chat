import React, { useContext, useEffect, useState } from 'react';
import { addDefaultChannelIfDoesNotExist } from '../../../../business-logic/channel-catalog-fish/logic';
import { StateContextUI } from '../../../state-manager/UIStateManager';
import { Chat } from './Chat';
import { Alert } from '../../../common/Alert/Alert';
import { usePond } from '@actyx-contrib/react-pond';

export const ChatContainer = () => {
  const pond = usePond();

  const stateUI = useContext(StateContextUI);

  //#region Pond and Fishes

  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  useEffect(() => {
    const mainChannel = async () => {
      try {
        await addDefaultChannelIfDoesNotExist(pond)(stateUI.userUUID);
      } catch (err) {
        setPondErrorMessage(err);
      }
    };
    mainChannel();
  }, [pond, stateUI.userUUID]);

  //#endregion

  //#region UI mapping

  //#endregion

  return pondErrorMessage ? (
    <Alert variant="danger">{pondErrorMessage}</Alert>
  ) : (
    <Chat />
  );
};
