import React, { FC } from 'react';
import { Pond } from '@actyx/pond';
import { UsersCatalogFishState } from './business-logic/users-catalog-fish/types';
import { UsersCatalogFish } from './business-logic/users-catalog-fish/users-catalog-fish';
import { UIStateManager } from './ui/ui-state-manager/UIStateManager';
import { ScreenRooter as ScreenRouter } from './ui/ScreenRouter/ScreenRouter';
import { PondError } from './ui/PondError/PondError';
import { ChannelFishState } from './business-logic/channel-fish/types';
import { ChannelFish } from './business-logic/channel-fish/channel-fish';

let pond: Pond | undefined;

export const App: FC = () => {
  const [
    stateUsersCatalogFish,
    setStateUsersCatalogFish,
  ] = React.useState<UsersCatalogFishState>();

  const [
    stateChannelMainFish,
    setStateChannelMainFish,
  ] = React.useState<ChannelFishState>();

  React.useEffect(() => {
    const main = async () => {
      pond = await Pond.default();

      pond.observe(UsersCatalogFish.fish, setStateUsersCatalogFish);
      pond.observe(ChannelFish.mainFish, setStateChannelMainFish);
    };
    main();
  }, []);

  return (
    <UIStateManager>
      {pond && stateUsersCatalogFish && stateChannelMainFish ? (
        <ScreenRouter
          pond={pond}
          stateUsersCatalogFish={stateUsersCatalogFish}
          stateChannelMainFish={stateChannelMainFish}
        />
      ) : (
        <PondError />
      )}
    </UIStateManager>
  );
};
