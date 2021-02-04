import React, { FC } from 'react';
import { Pond } from '@actyx/pond';
import { AuthenticationContainer } from './ui/Authentication/AuthenticationContainer';
import { UsersCatalogFishState } from './business-logic/users-catalog-fish/types';
import { UsersCatalogFish } from './business-logic/users-catalog-fish/users-catalog-fish';
import { UserProfileContainer } from './ui/UserProfile/UserProfileContainer';
import {
  reducer,
  inititialState,
  DispatchContextUI,
  StateContextUI,
} from './ui/reducer/context-ui';

let pond: Pond | undefined;

export const App: FC = () => {
  const [stateUI, dispatch] = React.useReducer(reducer, inititialState);

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
    <DispatchContextUI.Provider value={dispatch}>
      <StateContextUI.Provider value={stateUI}>
        <div>
          {pond && stateUsersCatalogFish ? (
            <>
              <AuthenticationContainer
                pond={pond}
                fishState={stateUsersCatalogFish}
              />
              <UserProfileContainer
                pond={pond}
                fishState={stateUsersCatalogFish}
              />
            </>
          ) : (
            'Pond is not loaded. Make sure you have an node running ActyxOS'
          )}
          <hr />
          UI STATE
          <pre>{JSON.stringify(stateUI, undefined, 4)}</pre>
          <hr />
          UsersCatalog fish state
          <pre>{JSON.stringify(stateUsersCatalogFish, undefined, 4)}</pre>
        </div>
      </StateContextUI.Provider>
    </DispatchContextUI.Provider>
  );
};
