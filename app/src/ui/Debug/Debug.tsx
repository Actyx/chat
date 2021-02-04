import React, { FC } from 'react';
import { UsersCatalogFishState } from '../../business-logic/users-catalog-fish/types';
import { StateUI } from '../ui-state-manager/types';

type Props = Readonly<{
  stateUI: StateUI;
  stateUsersCatalogFish: UsersCatalogFishState;
}>;

const format = (value: any) => JSON.stringify(value, undefined, 4);

export const Debug: FC<Props> = ({ stateUI, stateUsersCatalogFish }) => {
  return (
    <div>
      <hr />
      <h5>stateUI</h5>
      <pre>{format(stateUI)}</pre>
      <br />
      <hr />
      <h5>UsersCatalog fish state</h5>
      <pre>{format(stateUsersCatalogFish)}</pre>
    </div>
  );
};
