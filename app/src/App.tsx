import React, { useReducer, useState } from 'react';
import { Pond } from '@actyx-contrib/react-pond';
import { Alert } from './ui/common/Alert/Alert';
import { Debug } from './ui/custom/Debug/Debug';
import { ScreenRouter } from './ui/custom/ScreenRouter/ScreenRouter';
import { reducer } from './ui/state-manager/reducer';
import { Screens, StateUIAnonymous } from './ui/state-manager/state-types';
import { DispatchContext } from './ui/state-manager/dispatch';

const inititialState: StateUIAnonymous = {
  type: 'anonymous',
  screen: Screens.Authentication,
};

export const App = () => {
  const [pondErrorMessage, setPondErrorMessage] = useState<string>();

  const [stateUI, dispatch] = useReducer(reducer, inititialState);

  return (
    <>
      <Pond onError={(err) => setPondErrorMessage(err as string)}>
        <DispatchContext.Provider value={dispatch}>
          <ScreenRouter stateUI={stateUI} />
        </DispatchContext.Provider>
        <Debug stateUI={stateUI} />
      </Pond>
      {pondErrorMessage && (
        <div className="fixed top-0 left-0 w-full">
          <Alert variant="danger">{pondErrorMessage}</Alert>
        </div>
      )}
    </>
  );
};
