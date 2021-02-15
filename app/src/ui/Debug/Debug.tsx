import { Pond } from '@actyx/pond';
import React, { FC, useContext, useEffect } from 'react';
import {
  initialStateCannelFish,
  mainChannelFish,
} from '../../business-logic/channel-fish/channel-fish';
import { ChannelFishState } from '../../business-logic/channel-fish/types';
import { UsersCatalogFishState } from '../../business-logic/users-catalog-fish/types';
import {
  initialStateUserCatalogFish,
  UsersCatalogFish,
} from '../../business-logic/users-catalog-fish/users-catalog-fish';
import { StateContextUI } from '../ui-state-manager/UIStateManager';

type Props = Readonly<{
  pond: Pond;
}>;

const format = (value: any) => JSON.stringify(value, undefined, 4);

export const Debug: FC<Props> = ({ pond }) => {
  const stateUI = useContext(StateContextUI);

  const [
    stateUsersCatalogFish,
    setStateUsersCatalogFish,
  ] = React.useState<UsersCatalogFishState>(initialStateUserCatalogFish);

  const [
    stateChannelMainFish,
    setStateChannelMainFish,
  ] = React.useState<ChannelFishState>(initialStateCannelFish);

  useEffect(() => {
    const cancelSubUserCatalogFish = pond.observe(
      UsersCatalogFish.fish,
      setStateUsersCatalogFish
    );

    const cancelSubscChannelFish = pond.observe(
      mainChannelFish,
      setStateChannelMainFish
    );
    return () => {
      cancelSubUserCatalogFish();
      cancelSubscChannelFish();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
