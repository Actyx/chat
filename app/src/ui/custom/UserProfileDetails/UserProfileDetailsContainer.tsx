import { usePond } from '@actyx-contrib/react-pond';
import React, { useContext, useState } from 'react';
import { UserCatalogFish } from '../../../business-logic/user-catalog-fish/user-catalog-fish';
import { editUserProfileWire } from '../../../business-logic/user-catalog-fish/wire';
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

  const handleEditUserProfile = async (displayName: string) => {
    try {
      const result = await editUserProfileWire(pond)(
        stateUI.userUUID,
        displayName
      );
      if (result.type === 'ok') {
        dispatch(closeSectionRight());
      } else {
        setInvalidMessage(getUIMessage(result.code));
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
