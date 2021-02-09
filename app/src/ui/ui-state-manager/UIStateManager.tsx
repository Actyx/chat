import React, { FC } from 'react';
import { MAIN_CHANNEL } from '../../business-logic/channel-fish/channel-fish';
import {
  Action,
  ActionType,
  Dispatcher,
  Screens,
  SectionRight,
  StateUI,
} from './types';

export const inititialState: StateUI = {
  screen: Screens.Authentication,
  signedInUserUUID: '',
  sectionRight: SectionRight.None,
  activeChannelId: MAIN_CHANNEL,
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
        signedInUserUUID: action.payload.signedInUser,
      };
    case ActionType.EditSectionRight:
      return {
        ...state,
        sectionRight: action.payload.section,
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
