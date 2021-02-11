import React, { FC } from 'react';
import { reducer } from './reducer';
import {
  Dispatcher,
  Screens,
  SectionCenter,
  SectionRight,
  StateUI,
} from './types';

export const inititialState: StateUI = {
  screen: Screens.Authentication,
  signedInUserUUID: undefined,
  sectionRight: SectionRight.None,
  sectionCenter: SectionCenter.Channel,
  activeChannelId: undefined,
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
