import { Pond } from '@actyx/pond';
import React, { FC, useContext } from 'react';
import { ChannelFishState } from '../../business-logic/channel-fish/types';
import {
  editUserProfile,
  getDisplayNameByUserUUID,
} from '../../business-logic/users-catalog-fish/logic';
import { UsersCatalogFishState } from '../../business-logic/users-catalog-fish/types';
import { closeSectionRight } from '../ui-state-manager/actions';
import { SectionRight } from '../ui-state-manager/types';
import {
  DispatchContextUI,
  StateContextUI,
} from '../ui-state-manager/UIStateManager';
import { UserProfileDetails } from '../UserProfileDetails/UserProfileDetails';
import { TopBar } from './TopBar';

type Props = Readonly<{
  pond: Pond;
  stateUsersCatalogFish: UsersCatalogFishState;
  stateChannelMainFish: ChannelFishState;
}>;

export const ChatContainer: FC<Props> = ({
  pond,
  stateUsersCatalogFish,
  stateChannelMainFish,
}) => {
  const dispatch = useContext(DispatchContextUI);

  const stateUI = useContext(StateContextUI);

  const userDisplayName = getDisplayNameByUserUUID(
    stateUI.signedInUser,
    stateUsersCatalogFish.users
  );

  const handleEditUserProfile = async (displayName: string) => {
    const isUserProfileEdited = await editUserProfile(
      pond,
      stateUsersCatalogFish.users,
      stateUI.signedInUser,
      displayName
    );
    if (isUserProfileEdited === true) {
      dispatch(closeSectionRight());
    }
  };

  return (
    <div>
      <TopBar userDisplayName={userDisplayName ?? ''} />
      <div>left - main side bar here</div>
      <div>{JSON.stringify(stateChannelMainFish)}</div>
      <div>
        {stateUI.sectionRight === SectionRight.UserProfileEdit && (
          <UserProfileDetails editUserProfile={handleEditUserProfile} />
        )}
      </div>
    </div>
  );
};
