import { Dispatch } from 'react';
import { UserUniqueIdentifier } from '../../business-logic/users-catalog-fish/types';

//#region UI State

export enum Screens {
  Authentication = 'Authentication',
  Chat = 'Chat',
}

export type StateUI = Readonly<{
  screen: Screens;
  signedInUser?: UserUniqueIdentifier;
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
    signedInUser: UserUniqueIdentifier;
  };
}>;

export type Action = EditScreenAction | AddSignedInUser;

export type Dispatcher = Dispatch<Action>;

//#endregion
