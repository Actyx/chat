import React, { FC } from 'react';
import { Pond } from '@actyx/pond';
import { UsersCatalogFishState } from './business-logic/users-catalog-fish/types';
import { UsersCatalogFish } from './business-logic/users-catalog-fish/users-catalog-fish';
import { UIStateManager } from './ui/ui-state-manager/UIStateManager';
import { ScreenRooter as ScreenRouter } from './ui/ScreenRouter/ScreenRouter';
import { PondError } from './ui/PondError/PondError';

let pond: Pond | undefined;

export const App: FC = () => {
  const [
    stateUsersCatalogFish,
    setStateUsersCatalogFish,
  ] = React.useState<UsersCatalogFishState>();

  React.useEffect(() => {
    const main = async () => {
      pond = await Pond.default();
      pond.observe(UsersCatalogFish.fish, setStateUsersCatalogFish);
    };
    main();
  }, []);

  return (
    <UIStateManager>
      <div>
        {pond && stateUsersCatalogFish ? (
          <ScreenRouter
            pond={pond}
            stateUsersCatalogFish={stateUsersCatalogFish}
          />
        ) : (
          <PondError />
        )}
      </div>
    </UIStateManager>
  );
};
