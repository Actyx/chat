import React from 'react';
import { Pond } from '@actyx/pond';
import { UsersCatalogFish } from './business-logic/users-catalog-fish/users-catalog-fish';
import { UsersCatalogFishState } from './business-logic/users-catalog-fish/types';
import {
  isUserEmailRegistered,
  checkUserEmailAndSignup,
  isUserUniqueIdentifierRegistered,
} from './business-logic/users-catalog-fish/logic';

export let pondSingletone: Pond | undefined;

const TEST_EMAIL = 'simone@actyx.io';

export const App = () => {
  const [
    stateUsersCatalogFish,
    setStateUsersCatalogFish,
  ] = React.useState<UsersCatalogFishState>();

  const handleSignUp = () => {
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

  const handleSignIn = () => {
    if (stateUsersCatalogFish) {
      const canSignIn = isUserUniqueIdentifierRegistered(
        '67debbb6-6e68-4829-ada2-18e234aeba6c',
        stateUsersCatalogFish?.users
      );
      if (canSignIn) {
        window.alert('user is signed in');
      } else {
        window.alert('sorry cannot sign in');
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
      <button onClick={handleSignUp} type="button">
        Sing-up user simone@actyx.io
      </button>
      <button onClick={handleSignIn} type="button">
        Sign-in user Simone with user unique identifier
      </button>
    </div>
  );
};
