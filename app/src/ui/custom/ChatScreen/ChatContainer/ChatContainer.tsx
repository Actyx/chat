import React, { useContext, useEffect, useState } from 'react';
import { StateContextUI } from '../../../state-manager/UIStateManager';
import { Chat } from './Chat';
import { Alert } from '../../../common/Alert/Alert';
import { usePond } from '@actyx-contrib/react-pond';
import { ChannelCatalogFish } from '../../../../business-logic/channel-catalog-fish/channel-catalog-fish';
import { wire } from '../../../../business-logic/common/logic-helpers';
import { addDefaultChannelIfDoesNotExistLogic } from '../../../../business-logic/channel-catalog-fish/logic/addDefaultChannelIfDoesNotExist';

export const ChatContainer = () => {
  const pond = usePond();

  const stateUI = useContext(StateContextUI);

  //#region Pond and Fishes

  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  useEffect(() => {
    const performAddDefaultChannel = wire(
      pond,
      ChannelCatalogFish
    )(addDefaultChannelIfDoesNotExistLogic);

    const mainChannel = async () => {
      performAddDefaultChannel(stateUI.userUUID).catch(setPondErrorMessage);
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
