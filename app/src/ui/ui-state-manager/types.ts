import { Dispatch } from 'react';
import { ChannelId } from '../../business-logic/message/types';
import {
  AnonymousUser,
  UserUUID,
} from '../../business-logic/user-catalog-fish/types';

//#region UI State

export enum Screens {
  Authentication = 'Authentication',
  Chat = 'Chat',
}

export enum Dialogs {
  None = 'None',
  AddChannel = 'AddChannel',
}

export enum SectionRight {
  None = 'None',
  UserProfileEdit = ' UserProfileEdit',
}

export enum SectionCenter {
  Channel = 'Channel',
  ChannelsCatalog = 'ChannelsCatalog',
}

export type StateUI = Readonly<{
  screen: Screens;
  dialog: Dialogs;
  userUUID: UserUUID | AnonymousUser;
  sectionRight: SectionRight;
  sectionCenter: SectionCenter;
  activeChannelId: ChannelId;
}>;

//#endregion

//#region Actions

export enum ActionType {
  GoToAuthenticationScreen = 'GoToAuthenticationScreen',
  GoToChatScreen = 'GoToChatScreen',
  AddSignedInUser = 'AddSignedInUser',
  EditSectionRight = 'EditSectionRight',
  SignOutActiveUser = 'SignOutActiveUser',
  ShowChannelsCatalogSection = 'ShowChannelsCatalogSection',
  ShowChannelSection = 'ShowChannelSection',
}

export type GoToAuthenticationScreen = Readonly<{
  type: ActionType.GoToAuthenticationScreen;
}>;

export type GoToChatScreen = Readonly<{
  type: ActionType.GoToChatScreen;
}>;

export type ShowChannelsCatalogSection = Readonly<{
  type: ActionType.ShowChannelsCatalogSection;
}>;

export type ShowChannelSection = Readonly<{
  type: ActionType.ShowChannelSection;
  payload: {
    channelId: ChannelId;
  };
}>;

export type AddSignedInUser = Readonly<{
  type: ActionType.AddSignedInUser;
  payload: {
    userUUID: UserUUID;
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
  | GoToAuthenticationScreen
  | GoToChatScreen
  | ShowChannelsCatalogSection
  | ShowChannelSection
  | AddSignedInUser
  | EditSectionRight
  | SignOutActiveUser;

export type Dispatcher = Dispatch<Action>;

//#endregion
