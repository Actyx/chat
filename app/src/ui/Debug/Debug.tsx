import { Pond } from '@actyx/pond';
import { useContext, useEffect, useState } from 'react';
import { mkChannelFish } from '../../business-logic/channel-fish/channel-fish';
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

export const Debug = ({ pond }: Props) => {
  const stateUI = useContext(StateContextUI);

  const [
    stateUserCatalogFish,
    setStateUserCatalogFish,
  ] = useState<UserCatalogFishState>(UserCatalogFish.fish.initialState);

  const [stateChannelFish, setStateChannelFish] = useState<ChannelFishState>(
    mkChannelFish(stateUI.activeChannelId).initialState
  );

  const [
    stateChannelsCatalogFish,
    setChannelsCatalogFish,
  ] = useState<ChannelCatalogFishState>(ChannelCatalogFish.fish.initialState);

  const [showDebug, setShowDebug] = useState<boolean>(false);

  useEffect(() => {
    const cancelSubUserCatalogFish = pond.observe(
      UserCatalogFish.fish,
      setStateUserCatalogFish
    );

    const cancelSubscChannelFish = pond.observe(
      mkChannelFish(stateUI.activeChannelId),
      setStateChannelFish
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
  }, [pond, stateUI.activeChannelId]);

  const handleShowDebug = () => setShowDebug(!showDebug);

  return (
    <div>
      <button className="text-gray-100" onClick={handleShowDebug}>
        debug
      </button>
      {showDebug && (
        <div>
          <hr />
          <h5>stateUI</h5>
          <pre>{format(stateUI)}</pre>
          <br />
          <hr />
          <h5>UserCatalog state</h5>
          <pre>{format(stateUserCatalogFish)}</pre>
          <h5>ChannelFish state</h5>
          <pre>{format(stateChannelFish)}</pre>
          <h5>ChannelsCatalogFish state</h5>
          <pre>{format(stateChannelsCatalogFish)}</pre>
        </div>
      )}
    </div>
  );
};
