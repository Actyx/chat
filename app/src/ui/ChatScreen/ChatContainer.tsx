import { Pond } from '@actyx/pond';
import React, { FC, useContext } from 'react';
import { getDisplayForFromUserUUID } from '../../business-logic/users-catalog-fish/logic';
import { UsersCatalogFishState } from '../../business-logic/users-catalog-fish/types';
import { openSectionUserProfile } from '../ui-state-manager/actions';
import { SectionRight } from '../ui-state-manager/types';
import {
  DispatchContextUI,
  StateContextUI,
} from '../ui-state-manager/UIStateManager';
import { UserProfileContainer } from '../UserProfile/UserProfileContainer';
import { TopBar } from './TopBar';

type Props = Readonly<{
  pond: Pond;
  stateUsersCatalogFish: UsersCatalogFishState;
}>;

export const ChatContainer: FC<Props> = ({ pond, stateUsersCatalogFish }) => {
  const dispatch = useContext(DispatchContextUI);

  const stateUI = useContext(StateContextUI);

  const userDisplayName = getDisplayForFromUserUUID(
    stateUI.signedInUser,
    stateUsersCatalogFish.users
  );

  const handleEditDisplayName = () => dispatch(openSectionUserProfile());

  return (
    <div>
      <TopBar
        userDisplayName={userDisplayName}
        editUserDisplayName={handleEditDisplayName}
      />
      <div>left - main side bar here</div>
      <div>center - channel messages here</div>
      <div>
        {stateUI.sectionRight === SectionRight.UserProfileEdit && (
          <UserProfileContainer
            pond={pond}
            stateUsersCatalogFish={stateUsersCatalogFish}
          />
        )}
      </div>
    </div>
  );
};
