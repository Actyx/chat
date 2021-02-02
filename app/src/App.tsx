import React from 'react';
import { Pond } from '@actyx/pond';
import { UsersCatalogFish } from './business-logic/users-catalog-fish/users-catalog-fish';
import { UsersCatalogFishState } from './business-logic/users-catalog-fish/types';
import {
  isUserEmailRegistered,
  checkUserEmailAndSignup,
} from './business-logic/users-catalog-fish/logic';

export let pondSingletone: Pond | undefined;

const TEST_EMAIL = 'simone@actyx.io';

export const App = () => {
  const [
    stateUsersCatalogFish,
    setStateUsersCatalogFish,
  ] = React.useState<UsersCatalogFishState>();

  const handleAddUser = () => {
    if (pondSingletone && stateUsersCatalogFish) {
      if (
        isUserEmailRegistered(TEST_EMAIL, stateUsersCatalogFish.usersEmails)
      ) {
        window.alert('sorry eamil for this user has been already registered');
      } else {
        checkUserEmailAndSignup(
          pondSingletone,
          'simone',
          'simone@actyx.io',
          stateUsersCatalogFish.usersEmails
        );
      }
    }
  };

  React.useEffect(() => {
    const main = async () => {
      pondSingletone = await Pond.default();
      pondSingletone.observe(UsersCatalogFish.fish, setStateUsersCatalogFish);
    };
    main();
  }, []);

  return (
    <div>
      <h1>UsersCatalog fish</h1>
      <h2>State</h2>
      <pre>{JSON.stringify(stateUsersCatalogFish, undefined, 4)}</pre>
      <button onClick={handleAddUser} type="button">
        Add a user
      </button>
    </div>
  );
};
