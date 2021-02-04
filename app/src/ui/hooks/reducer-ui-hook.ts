import React from 'react';
import { Action, ActionType, Dispatcher, StateUI } from './types';

export const inititialState: StateUI = {
  screen: 'authentication',
};

export const reducer = (state: StateUI, action: Action): StateUI => {
  debugger;
  switch (action.type) {
    case ActionType.EditScreen:
      return {
        ...state,
        screen: action.payload.screen,
      };
  }
};

export const useReducerUI = (): {
  stateUI: StateUI;
  dispatch: Dispatcher;
} => {
  const [stateUI, dispatch] = React.useReducer(reducer, inititialState);

  return {
    stateUI,
    dispatch,
  };
};
