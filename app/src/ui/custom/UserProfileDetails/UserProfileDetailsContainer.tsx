import { usePond } from '@actyx-contrib/react-pond';
import React, { useContext, useState } from 'react';
import { wire } from '../../../business-logic/common/logic-wire';
import { editUserProfile } from '../../../business-logic/user-catalog-fish/logic/editUserProfile';
import { UserCatalogFish } from '../../../business-logic/user-catalog-fish/user-catalog-fish';
import { getUIMessage } from '../../../l10n/l10n';
import { closeSectionRight } from '../../state-manager/actions';
import { StateUIAuthenticated } from '../../state-manager/state-types';
import {
  DispatchContextUI,
  StateContextUI,
} from '../../state-manager/UIStateManager';
import { useFish } from '../../utils/use-fish';
import { getDisplayNameByUser } from '../ChatScreen/ChatContainer/ui-map';
import { UserProfileDetails } from './UserProfileDetails';

export const UserProfileDetailsContainer = () => {
  const pond = usePond();

  const stateUI = useContext(StateContextUI) as StateUIAuthenticated;

  const dispatch = useContext(DispatchContextUI);

  const [invalidMessage, setInvalidMessage] = useState<string>();

  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const handleHideUserProfileDetails = () => dispatch(closeSectionRight());

  const userCatalogFishState = useFish(
    pond,
    UserCatalogFish,
    UserCatalogFish.initialState
  );

  const userDisplayName = getDisplayNameByUser(
    stateUI.userUUID,
    userCatalogFishState.users
  );

  const performUserProfileEdit = wire(pond, UserCatalogFish)(editUserProfile);

  const handleEditUserProfile = async (displayName: string) => {
    performUserProfileEdit(displayName, stateUI.userUUID)
      .then((result) => {
        if (result.type === 'ok') {
          dispatch(closeSectionRight());
        } else {
          setInvalidMessage(getUIMessage(result.code));
        }
      })
      .catch(setPondErrorMessage);
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
