import { usePond } from '@actyx-contrib/react-pond';
import React, { useContext, useState } from 'react';
import { editUserProfileWire } from '../../../business-logic/user-catalog-fish/wire';
import { getUIMessage } from '../../../l10n/l10n';
import { closeSectionRight } from '../../state-manager/actions';
import {
  DispatchContextUI,
  StateContextUI,
} from '../../state-manager/UIStateManager';
import { UserProfileDetails } from './UserProfileDetails';

type UserProfileDetailsContainerProps = {
  userDisplayName: string;
};

export const UserProfileDetailsContainer = ({
  userDisplayName,
}: UserProfileDetailsContainerProps) => {
  const pond = usePond();

  const stateUI = useContext(StateContextUI);

  const dispatch = useContext(DispatchContextUI);

  const [invalidMessage, setInvalidMessage] = useState<string>();

  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const handleHideUserProfileDetails = () => dispatch(closeSectionRight());

  const handleEditUserProfile = async (displayName: string) => {
    try {
      const result = await editUserProfileWire(pond)(
        stateUI.userUUID,
        displayName
      );
      debugger;
      if (result.type === 'ok') {
        dispatch(closeSectionRight());
      } else {
        setInvalidMessage(getUIMessage(result.code));
      }
    } catch (err) {
      debugger;
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
