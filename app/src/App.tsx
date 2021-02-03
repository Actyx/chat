import React, { FC } from 'react';
import { Pond } from '@actyx/pond';
import { AuthenticationContainer } from './ui/Authentication/AuthenticationContainer';
import { UsersCatalogFishState } from './business-logic/users-catalog-fish/types';
import { UsersCatalogFish } from './business-logic/users-catalog-fish/users-catalog-fish';

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
    <div>
      {pond && stateUsersCatalogFish ? (
        <AuthenticationContainer
          pond={pond}
          fishState={stateUsersCatalogFish}
        />
      ) : (
        'loading...'
      )}
      <hr />
      UsersCatalog fish state
      <pre>{JSON.stringify(stateUsersCatalogFish, undefined, 4)}</pre>
    </div>
  );
};
