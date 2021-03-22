import { usePond } from '@actyx-contrib/react-pond';
import React, { useContext, useState } from 'react';
import { DispatchContextUI } from '../../../App';
import { wire } from '../../../business-logic/common/logic-wire';
import { editUserProfile } from '../../../business-logic/user-catalog-fish/logic/editUserProfile';
import { UserUUID } from '../../../business-logic/user-catalog-fish/types';
import { UserCatalogFish } from '../../../business-logic/user-catalog-fish/user-catalog-fish';
import { getUIMessage } from '../../../l10n/l10n';
import { closeSectionRight } from '../../state-manager/actions';
import { useFish } from '../../utils/use-fish';
import { getDisplayNameByUser } from '../ChatScreen/ChatContainer/ui-map';
import { UserProfileDetails } from './UserProfileDetails';

type UserProfileDetailsContainerProps = Readonly<{ userUUID: UserUUID }>;

export const UserProfileDetailsContainer = ({
  userUUID,
}: UserProfileDetailsContainerProps) => {
  const pond = usePond();

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
    userUUID,
    userCatalogFishState.users
  );

  const performUserProfileEdit = wire(pond, UserCatalogFish)(editUserProfile);

  const handleEditUserProfile = async (displayName: string) => {
    performUserProfileEdit(displayName, userUUID)
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
