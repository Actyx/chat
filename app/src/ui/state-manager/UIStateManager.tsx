import { ReactChild, useReducer, createContext } from 'react';
import { Dispatcher } from './actions-types';
import { reducer } from './reducer';
import { Screens, StateUI } from './state-types';

const inititialState: StateUI = {
  type: 'anonymous',
  screen: Screens.Authentication,
};

export const StateContextUI = createContext<StateUI>(inititialState);

export const DispatchContextUI = createContext<Dispatcher>(undefined!);

export const UIStateManager = ({
  children,
}: Readonly<{ children: ReactChild }>) => {
  const [stateUI, dispatch] = useReducer(reducer, inititialState);

  return (
    <DispatchContextUI.Provider value={dispatch}>
      <StateContextUI.Provider value={stateUI}>
        {children}
      </StateContextUI.Provider>
    </DispatchContextUI.Provider>
  );
};
