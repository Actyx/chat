import React, { useContext, useEffect, useState } from 'react';
import { addDefaultChannelIfDoesNotExist } from '../../../../business-logic/channel-catalog-fish/logic';
import { UserCatalogFish } from '../../../../business-logic/user-catalog-fish/user-catalog-fish';
import { SectionRight } from '../../../state-manager/types';
import { StateContextUI } from '../../../state-manager/UIStateManager';
import { getDisplayNameByUser } from './ui-map';
import { Chat } from './Chat';
import { Alert } from '../../../common/Alert/Alert';
import { useFish } from '../../../utils/use-fish';
import { usePond } from '@actyx-contrib/react-pond';

export const ChatContainer = () => {
  const pond = usePond();

  const stateUI = useContext(StateContextUI);

  //#region Pond and Fishes

  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const stateUserCatalogFish = useFish(
    pond,
    UserCatalogFish,
    UserCatalogFish.initialState
  );

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

  const userDisplayName = getDisplayNameByUser(
    stateUI.userUUID,
    stateUserCatalogFish.users
  );

  const canShowUserProfileDetails =
    stateUI.sectionRight === SectionRight.UserProfileEdit;

  //#endregion

  return (
    <>
      {pondErrorMessage && <Alert variant="danger">{pondErrorMessage}</Alert>}
      <Chat
        userDisplayName={userDisplayName}
        canShowUserProfileDetails={canShowUserProfileDetails}
      />
    </>
  );
};
