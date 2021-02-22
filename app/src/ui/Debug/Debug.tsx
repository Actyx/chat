import { Pond } from '@actyx/pond';
import { FC, useContext, useEffect, useState } from 'react';
import { mainChannelFish } from '../../business-logic/channel-fish/channel-fish';
import { ChannelFishState } from '../../business-logic/channel-fish/types';
import { ChannelCatalogFish } from '../../business-logic/channel-catalog-fish/channel-catalog-fish';
import { ChannelCatalogFishState } from '../../business-logic/channel-catalog-fish/types';
import { UserCatalogFishState } from '../../business-logic/user-catalog-fish/types';
import { UserCatalogFish } from '../../business-logic/user-catalog-fish/user-catalog-fish';
import { StateContextUI } from '../ui-state-manager/UIStateManager';

type Props = Readonly<{
  pond: Pond;
}>;

const format = (value: any) => JSON.stringify(value, undefined, 4);

export const Debug: FC<Props> = ({ pond }) => {
  const stateUI = useContext(StateContextUI);

  const [
    stateUserCatalogFish,
    setStateUserCatalogFish,
  ] = useState<UserCatalogFishState>(UserCatalogFish.fish.initialState);

  const [
    stateChannelMainFish,
    setStateChannelMainFish,
  ] = useState<ChannelFishState>(mainChannelFish.initialState);

  const [
    stateChannelsCatalogFish,
    setChannelsCatalogFish,
  ] = useState<ChannelCatalogFishState>(ChannelCatalogFish.fish.initialState);

  useEffect(() => {
    const cancelSubUserCatalogFish = pond.observe(
      UserCatalogFish.fish,
      setStateUserCatalogFish
    );

    const cancelSubscChannelFish = pond.observe(
      mainChannelFish,
      setStateChannelMainFish
    );

    const cancelChannelsCatalogFish = pond.observe(
      ChannelCatalogFish.fish,
      setChannelsCatalogFish
    );

    return () => {
      cancelSubUserCatalogFish();
      cancelSubscChannelFish();
      cancelChannelsCatalogFish();
    };
  }, [pond]);

  return (
    <div>
      <hr />
      <h5>stateUI</h5>
      <pre>{format(stateUI)}</pre>
      <br />
      <hr />
      <h5>UserCatalog state</h5>
      <pre>{format(stateUserCatalogFish)}</pre>
      <h5>ChannelFish state</h5>
      <pre>{format(stateChannelMainFish)}</pre>
      <h5>ChannelsCatalogFish state</h5>
      <pre>{format(stateChannelsCatalogFish)}</pre>
    </div>
  );
};
