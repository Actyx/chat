import { Dispatch } from 'react';

//#region UI State

export enum Screens {
  Authentication = 'Authentication',
  Chat = 'Chat',
}

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
