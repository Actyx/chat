import { Dispatch } from 'react';
import { ChannelId } from '../../business-logic/message/types';
import { UserUUID } from '../../business-logic/users-catalog-fish/types';

//#region UI State

export enum Screens {
  Authentication = 'Authentication',
  Chat = 'Chat',
}

export enum SectionRight {
  None = 'None',
  UserProfileEdit = ' UserProfileEdit',
}

export type StateUI = Readonly<{
  screen: Screens;
  signedInUserUUID?: UserUUID;
  sectionRight: SectionRight;
  activeChannelId?: ChannelId;
}>;

//#endregion

//#region Actions

export enum ActionType {
  EditScreen = 'EditScreen',
  AddSignedInUser = 'AddSignedInUser',
  EditSectionRight = 'EditSectionRight',
  SignOutActiveUser = 'SignOutActiveUser',
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

export type SignOutActiveUser = Readonly<{
  type: ActionType.SignOutActiveUser;
}>;

export type Action =
  | EditScreenAction
  | AddSignedInUser
  | EditSectionRight
  | SignOutActiveUser;

export type Dispatcher = Dispatch<Action>;

//#endregion
