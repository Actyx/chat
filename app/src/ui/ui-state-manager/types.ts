import { Dispatch } from 'react';
import { UserUUID } from '../../business-logic/users-catalog-fish/types';

//#region UI State

export enum Screens {
  Authentication = 'Authentication',
  Chat = 'Chat',
}

export enum SectionRight {
  Closed = 'Closed',
  UserProfileEdit = ' UserProfileEdit',
}

export type StateUI = Readonly<{
  screen: Screens;
  signedInUser: UserUUID;
  sectionRight: SectionRight;
}>;

//#endregion

//#region Actions

export enum ActionType {
  EditScreen = 'EditScreen',
  AddSignedInUser = 'AddSignedInUser',
  EditSectionRight = 'EditSectionRight',
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

export type EditSectionRight = Readonly<{
  type: ActionType.EditSectionRight;
  payload: {
    section: SectionRight;
  };
}>;

export type Action = EditScreenAction | AddSignedInUser | EditSectionRight;

export type Dispatcher = Dispatch<Action>;

//#endregion
