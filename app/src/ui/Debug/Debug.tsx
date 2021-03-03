import { Pond } from '@actyx/pond';
import { useContext, useEffect, useState } from 'react';
import { mkChannelFish } from '../../business-logic/channel-fish/channel-fish';
import { ChannelFishState } from '../../business-logic/channel-fish/types';
import { ChannelCatalogFish } from '../../business-logic/channel-catalog-fish/channel-catalog-fish';
import { ChannelCatalogFishState } from '../../business-logic/channel-catalog-fish/types';
import { UserCatalogFishState } from '../../business-logic/user-catalog-fish/types';
import { UserCatalogFish } from '../../business-logic/user-catalog-fish/user-catalog-fish';
import { StateContextUI } from '../ui-state-manager/UIStateManager';
import { ButtonLink } from '../common/ButtonLink/ButtonLink';
import { Typography } from '../common/Typography/Typography';

type Props = Readonly<{
  pond: Pond;
}>;

const format = (value: any) => JSON.stringify(value, undefined, 4);

export const Debug = ({ pond }: Props) => {
  const stateUI = useContext(StateContextUI);

  const [
    stateUserCatalogFish,
    setStateUserCatalogFish,
  ] = useState<UserCatalogFishState>(UserCatalogFish.initialState);

  const [stateChannelFish, setStateChannelFish] = useState<ChannelFishState>(
    mkChannelFish(stateUI.activeChannelId).initialState
  );

  const [
    stateChannelsCatalogFish,
    setChannelsCatalogFish,
  ] = useState<ChannelCatalogFishState>(ChannelCatalogFish.initialState);

  const [showDebug, setShowDebug] = useState<boolean>(false);

  useEffect(() => {
    const cancelSubUserCatalogFish = pond.observe(
      UserCatalogFish,
      setStateUserCatalogFish
    );

    const cancelSubscChannelFish = pond.observe(
      mkChannelFish(stateUI.activeChannelId),
      setStateChannelFish
    );

    const cancelChannelsCatalogFish = pond.observe(
      ChannelCatalogFish,
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
    <div className="fixed bottom-1 right-1">
      {showDebug && (
        <div
          style={{ width: '75vw', height: '50vh', overflow: 'scroll' }}
          className="fixed bottom-1 left-1 bg-gray-100 p-2"
        >
          <h5>stateUI</h5>
          <pre>{format(stateUI)}</pre>
          <br />
          <hr />
          <h5>UserCatalog</h5>
          <pre>{format(stateUserCatalogFish)}</pre>
          <h5>ChannelFish</h5>
          <pre>{format(stateChannelFish)}</pre>
          <h5>ChannelsCatalogFish state</h5>
          <pre>{format(stateChannelsCatalogFish)}</pre>
        </div>
      )}
      <ButtonLink type="button" click={handleShowDebug}>
        <Typography color="gray-light">debug</Typography>
      </ButtonLink>
    </div>
  );
};
