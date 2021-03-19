import React, { useContext, useEffect, useState } from 'react';
import { StateContextUI } from '../../../state-manager/UIStateManager';
import { Chat } from './Chat';
import { Alert } from '../../../common/Alert/Alert';
import { usePond } from '@actyx-contrib/react-pond';
import { ChannelCatalogFish } from '../../../../business-logic/channel-catalog-fish/channel-catalog-fish';
import { wire } from '../../../../business-logic/common/logic-wire';
import { addDefaultChannelIfDoesNotExist } from '../../../../business-logic/channel-catalog-fish/logic/addDefaultChannelIfDoesNotExist';
import { UserCatalogFish } from '../../../../business-logic/user-catalog-fish/user-catalog-fish';
import { useFish } from '../../../utils/use-fish';

export const ChatContainer = () => {
  const pond = usePond();

  const stateUI = useContext(StateContextUI);

  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const userCatalogFishState = useFish(
    pond,
    UserCatalogFish,
    UserCatalogFish.initialState
  );

  useEffect(() => {
    const performAddDefaultChannel = wire(
      pond,
      ChannelCatalogFish
    )(addDefaultChannelIfDoesNotExist);

    const mainChannel = async () => {
      performAddDefaultChannel(
        userCatalogFishState.users,
        stateUI.userUUID
      ).catch(setPondErrorMessage);
    };

    mainChannel();
  }, [pond, stateUI.userUUID, userCatalogFishState.users]);

  return pondErrorMessage ? (
    <Alert variant="danger">{pondErrorMessage}</Alert>
  ) : (
    <Chat />
  );
};
