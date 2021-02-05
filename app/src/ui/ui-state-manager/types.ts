import { Dispatch } from 'react';
import { UserUUID } from '../../business-logic/users-catalog-fish/types';

//#region UI State

export enum Screens {
  Authentication = 'Authentication',
  Chat = 'Chat',
}

export type StateUI = Readonly<{
  screen: Screens;
  signedInUser: UserUUID;
}>;

//#endregion

//#region Actions

export enum ActionType {
  EditScreen = 'EditScreen',
  AddSignedInUser = 'AddSignedInUser',
}

export type EditScreenAction = Readonly<{
  type: ActionType.EditScreen;
  payload: {
    screen: Screens;
  };
}>;

export type AddSignedInUser = Readonly<{
  type: ActionType.AddSignedInUser;
  payload: {
    signedInUser: UserUUID;
  };
}>;

export type Action = EditScreenAction | AddSignedInUser;

export type Dispatcher = Dispatch<Action>;

//#endregion
