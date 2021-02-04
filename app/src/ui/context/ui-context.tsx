import React, { Dispatch } from 'react';
import { Action, ActionType, StateUI } from './types';

export const inititialState: StateUI = {
  screen: 'authentication',
};

export const UIStateContext = React.createContext(inititialState);

type Dispatcher = Dispatch<Action>;
export const UIDisplatchContext = React.createContext<Dispatcher | undefined>(
  undefined
);

export const reducer = (state: StateUI, action: Action): StateUI => {
  switch (action.type) {
    case ActionType.EditScreen:
      return {
        ...state,
        screen: action.payload.screen,
      };
  }
};
