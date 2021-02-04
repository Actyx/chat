import React, { FC } from 'react';
import { Action, ActionType, Dispatcher, Screens, StateUI } from './types';

export const inititialState: StateUI = {
  screen: Screens.Authentication,
  signedInUser: '',
};

export const reducer = (state: StateUI, action: Action): StateUI => {
  switch (action.type) {
    case ActionType.EditScreen:
      return {
        ...state,
        screen: action.payload.screen,
      };
    case ActionType.AddSignedInUser:
      return {
        ...state,
        signedInUser: action.payload.signedInUser,
      };
    default:
      return state;
  }
};

export const StateContextUI = React.createContext(inititialState);

export const DispatchContextUI = React.createContext<Dispatcher>(undefined!);

export const UIStateManager: FC<{ children: React.ReactChild }> = ({
  children,
}) => {
  const [stateUI, dispatch] = React.useReducer(reducer, inititialState);

  return (
    <DispatchContextUI.Provider value={dispatch}>
      <StateContextUI.Provider value={stateUI}>
        {children}
      </StateContextUI.Provider>
    </DispatchContextUI.Provider>
  );
};
