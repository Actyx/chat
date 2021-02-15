import React, { FC } from 'react';
import { MAIN_CHANNEL as DEFAULT_CHANNEL } from '../../business-logic/channel-fish/channel-fish';
import { reducer } from './reducer';
import {
  Dispatcher,
  Screens,
  SectionCenter,
  SectionRight,
  StateUI,
} from './types';

const inititialState: StateUI = {
  screen: Screens.Authentication,
  signedInUserUUID: undefined,
  sectionRight: SectionRight.None,
  sectionCenter: SectionCenter.Channel,
  activeChannelId: DEFAULT_CHANNEL,
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
