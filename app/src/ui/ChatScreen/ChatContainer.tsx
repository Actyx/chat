import { Pond } from '@actyx/pond';
import React, { FC, useContext } from 'react';
import { getDisplayForFromUserUniqueIdentifier } from '../../business-logic/users-catalog-fish/logic';
import { UsersCatalogFishState } from '../../business-logic/users-catalog-fish/types';
import { StateContextUI } from '../ui-state-manager/UIStateManager';
import { TopBar } from './TopBar';

type Props = Readonly<{
  pond: Pond;
  stateUsersCatalogFish: UsersCatalogFishState;
}>;

export const ChatContainer: FC<Props> = ({ pond, stateUsersCatalogFish }) => {
  const stateUI = useContext(StateContextUI);
  const userDisplayName = getDisplayForFromUserUniqueIdentifier(
    stateUI.signedInUser,
    stateUsersCatalogFish.users
  );

  return (
    <div>
      <TopBar userDisplayName={userDisplayName} />
      <div>left</div>
      <div>center</div>
      <div>right</div>
    </div>
  );
};
