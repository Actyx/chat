import { Pond } from '@actyx/pond';
import React, { FC, useContext } from 'react';
import { getDisplayForFromUserUUID } from '../../business-logic/users-catalog-fish/logic';
import { UsersCatalogFishState } from '../../business-logic/users-catalog-fish/types';
import { StateContextUI } from '../ui-state-manager/UIStateManager';
import { UserProfileContainer } from '../UserProfile/UserProfileContainer';
import { TopBar } from './TopBar';
import { SectionRight, SectionRightType } from './types';

type Props = Readonly<{
  pond: Pond;
  stateUsersCatalogFish: UsersCatalogFishState;
}>;

export const ChatContainer: FC<Props> = ({ pond, stateUsersCatalogFish }) => {
  const stateUI = useContext(StateContextUI);

  const [sectionRight, setSectionRight] = React.useState<SectionRight>();

  const userDisplayName = getDisplayForFromUserUUID(
    stateUI.signedInUser,
    stateUsersCatalogFish.users
  );

  const handleEditDisplayName = () =>
    setSectionRight(SectionRightType.UserProfileEdit);

  return (
    <div>
      <TopBar
        userDisplayName={userDisplayName}
        editUserDisplayName={handleEditDisplayName}
      />
      <div>left - main side bar here</div>
      <div>center - channel messages here</div>
      <div>
        {sectionRight && (
          <UserProfileContainer
            pond={pond}
            stateUsersCatalogFish={stateUsersCatalogFish}
          />
        )}
      </div>
    </div>
  );
};
