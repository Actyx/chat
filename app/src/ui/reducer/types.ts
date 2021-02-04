import { Dispatch } from 'react';

//#region UI State

export type Screens = 'authentication' | 'chat';

export type StateUI = Readonly<{
  screen: Screens;
}>;

//#endregion

//#region Actions

export enum ActionType {
  EditScreen = 'EditScreen',
}

export type EditScreenAction = Readonly<{
  type: ActionType.EditScreen;
  payload: {
    screen: Screens;
  };
}>;

export type Action = EditScreenAction;

export type Dispatcher = Dispatch<Action>;

//#endregion
