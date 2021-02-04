import React from 'react';
import { Action, ActionType, Dispatcher, StateUI } from './types';

export const inititialState: StateUI = {
  screen: 'authentication',
};

export const reducer = (state: StateUI, action: Action): StateUI => {
  switch (action.type) {
    case ActionType.EditScreen:
      return {
        ...state,
        screen: action.payload.screen,
      };
  }
};

export const StateContextUI = React.createContext(inititialState);

export const DispatchContextUI = React.createContext<Dispatcher>(undefined!);
