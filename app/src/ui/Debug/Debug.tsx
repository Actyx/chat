import { Pond } from '@actyx/pond';
import React, { FC, useContext, useEffect } from 'react';
import {
  initialStateCannelFish,
  mainChannelFish,
} from '../../business-logic/channel-fish/channel-fish';
import { ChannelFishState } from '../../business-logic/channel-fish/types';
import {
  ChannelsCatalogFish,
  initialStateChannelsCatalogFish,
} from '../../business-logic/channels-catalog-fish/channels-catalog-fish';
import { ChannelsCatalogFishState } from '../../business-logic/channels-catalog-fish/types';
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

  const [
    stateChannelsCatalogFish,
    setChannelsCatalogFish,
  ] = React.useState<ChannelsCatalogFishState>(initialStateChannelsCatalogFish);

  useEffect(() => {
    const cancelSubUserCatalogFish = pond.observe(
      UsersCatalogFish.fish,
      setStateUsersCatalogFish
    );

    const cancelSubscChannelFish = pond.observe(
      mainChannelFish,
      setStateChannelMainFish
    );

    const cancelChannelsCatalogFish = pond.observe(
      ChannelsCatalogFish.fish,
      setChannelsCatalogFish
    );

    return () => {
      cancelSubUserCatalogFish();
      cancelSubscChannelFish();
      cancelChannelsCatalogFish();
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
      <h5>UsersCatalog state</h5>
      <pre>{format(stateUsersCatalogFish)}</pre>
      <h5>ChannelFish state</h5>
      <pre>{format(stateChannelMainFish)}</pre>
      <h5>ChannelsCatalogFish state</h5>
      <pre>{format(stateChannelsCatalogFish)}</pre>
    </div>
  );
};
