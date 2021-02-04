import React, { Dispatch } from 'react';
import { Action, ActionType, Screens, StateUI } from './types';

export const inititialStateUI: StateUI = {
  screen: 'authentication',
};

export const ContextStateUI = React.createContext(inititialStateUI);

type XXX = Dispatch<
  Readonly<{ type: ActionType; payload: { screen: Screens } }>
>;
export const ContextDispatchUI = React.createContext<XXX | undefined>(
  undefined
);

export const reducerUI = (state: StateUI, action: Action): StateUI => {
  switch (action.type) {
    case ActionType.EditScreen:
      return {
        ...state,
        screen: action.payload.screen,
      };
  }
};
