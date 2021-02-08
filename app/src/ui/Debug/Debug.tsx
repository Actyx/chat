import React, { FC } from 'react';
import { ChannelFishState } from '../../business-logic/channel-fish/types';
import { UsersCatalogFishState } from '../../business-logic/users-catalog-fish/types';
import { StateUI } from '../ui-state-manager/types';

type Props = Readonly<{
  stateUI: StateUI;
  stateUsersCatalogFish: UsersCatalogFishState;
  stateChannelMainFish: ChannelFishState;
}>;

const format = (value: any) => JSON.stringify(value, undefined, 4);

export const Debug: FC<Props> = ({
  stateUI,
  stateUsersCatalogFish,
  stateChannelMainFish,
}) => {
  return (
    <div>
      <hr />
      <h5>stateUI</h5>
      <pre>{format(stateUI)}</pre>
      <br />
      <hr />
      <h5>UsersCatalog fish state</h5>
      <pre>{format(stateUsersCatalogFish)}</pre>
      <h5>Channel fish main state</h5>
      <pre>{format(stateChannelMainFish)}</pre>
    </div>
  );
};
