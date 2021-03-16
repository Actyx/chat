import { usePond } from '@actyx-contrib/react-pond';
import React, { useContext, useState } from 'react';
import { wire } from '../../../business-logic/common/logic-helpers';
import { editUserProfileLogic } from '../../../business-logic/user-catalog-fish/logic';
import {
  UserCatalogFishEvent,
  UserCatalogFishState,
} from '../../../business-logic/user-catalog-fish/types';
import { UserCatalogFish } from '../../../business-logic/user-catalog-fish/user-catalog-fish';
import { getUIMessage } from '../../../l10n/l10n';
import { closeSectionRight } from '../../state-manager/actions';
import {
  DispatchContextUI,
  StateContextUI,
} from '../../state-manager/UIStateManager';
import { useFish } from '../../utils/use-fish';
import { getDisplayNameByUser } from '../ChatScreen/ChatContainer/ui-map';
import { UserProfileDetails } from './UserProfileDetails';

export const UserProfileDetailsContainer = () => {
  const pond = usePond();

  const stateUI = useContext(StateContextUI);

  const dispatch = useContext(DispatchContextUI);

  const [invalidMessage, setInvalidMessage] = useState<string>();

  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const handleHideUserProfileDetails = () => dispatch(closeSectionRight());

  const stateUserCatalogFish = useFish(
    pond,
    UserCatalogFish,
    UserCatalogFish.initialState
  );

  const userDisplayName = getDisplayNameByUser(
    stateUI.userUUID,
    stateUserCatalogFish.users
  );

  const wireBl = wire<UserCatalogFishState, UserCatalogFishEvent, void>(pond)(
    UserCatalogFish
  );

  const handleEditUserProfile = async (displayName: string) => {
    try {
      const resultLogic = await wireBl(
        editUserProfileLogic(displayName, stateUI.userUUID)
      )();
      if (resultLogic.type === 'ok') {
        dispatch(closeSectionRight());
      } else {
        setInvalidMessage(getUIMessage(resultLogic.code));
      }
    } catch (err) {
      setPondErrorMessage(err);
    }
  };

  return (
    <UserProfileDetails
      invalidMessage={invalidMessage}
      pondErrorMessage={pondErrorMessage}
      userDisplayName={userDisplayName}
      editUserProfile={handleEditUserProfile}
      close={handleHideUserProfileDetails}
    />
  );
};
