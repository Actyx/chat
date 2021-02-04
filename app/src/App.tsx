import React, { FC } from 'react';
import { Pond } from '@actyx/pond';
import { AuthenticationContainer } from './ui/Authentication/AuthenticationContainer';
import { UsersCatalogFishState } from './business-logic/users-catalog-fish/types';
import { UsersCatalogFish } from './business-logic/users-catalog-fish/users-catalog-fish';
import { UserProfileContainer } from './ui/UserProfile/UserProfileContainer';
import {
  ContextDispatchUI,
  ContextStateUI,
  inititialStateUI,
  reducerUI,
} from './ui/context/ui-context';
import { ActionType } from './ui/context/types';

let pond: Pond | undefined;

export const App: FC = () => {
  const [stateUI, dispatch] = React.useReducer(reducerUI, inititialStateUI);

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
    <ContextStateUI.Provider value={stateUI}>
      <ContextDispatchUI.Provider value={dispatch}>
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
          UsersCatalog fish state
          <pre>{JSON.stringify(stateUsersCatalogFish, undefined, 4)}</pre>
          UI STATE
          <pre>{JSON.stringify(stateUI, undefined, 4)}</pre>
          <input
            type="submit"
            onClick={() =>
              dispatch &&
              dispatch({
                type: ActionType.EditScreen,
                payload: {
                  screen: 'chat',
                },
              })
            }
            value="Dispatch something"
          />
        </div>
      </ContextDispatchUI.Provider>
    </ContextStateUI.Provider>
  );
};
