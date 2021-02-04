import { Pond } from '@actyx/pond';
import React, { FC, useContext } from 'react';
import { UsersCatalogFishState } from '../../business-logic/users-catalog-fish/types';
import { StateContextUI } from '../ui-state-manager/UIStateManager';

type Props = Readonly<{
  pond: Pond;
  stateUsersCatalogFish: UsersCatalogFishState;
}>;

export const ChatContainer: FC<Props> = ({ pond, stateUsersCatalogFish }) => {
  const stateUI = useContext(StateContextUI);

  return (
    <div>
      <div>left</div>
      <div>center</div>
      <div>right</div>
    </div>
  );
};
