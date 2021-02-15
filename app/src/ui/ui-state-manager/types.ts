import { Dispatch } from 'react';
import { ChannelId } from '../../business-logic/message/types';
import { UserUUID } from '../../business-logic/users-catalog-fish/types';

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
  ChannelsCatalog = ' ChannelsCatalog',
}

export type StateUI = Readonly<{
  screen: Screens;
  dialog: Dialogs;
  signedInUserUUID?: UserUUID;
  sectionRight: SectionRight;
  sectionCenter: SectionCenter;
  activeChannelId: ChannelId;
}>;

//#endregion

//#region Actions

export enum ActionType {
  GoToAuthenticationScreen = 'GoToAuthenticationScreen',
  GoToChatScreen = 'GoToChatScreen',
  OpenDialogAddChannel = 'OpenDialogAddChannel',
  CloseDialog = 'CloseDialog',
  AddSignedInUser = 'AddSignedInUser',
  EditSectionRight = 'EditSectionRight',
  SignOutActiveUser = 'SignOutActiveUser',
  OpenChannelsCatalogSection = 'OpenChannelsCatalogSection',
  OpenChannelSection = 'OpenChannelSection',
}

export type GoToAuthenticationScreen = Readonly<{
  type: ActionType.GoToAuthenticationScreen;
}>;

export type GoToChatScreen = Readonly<{
  type: ActionType.GoToChatScreen;
}>;

export type OpenDialogAddChannel = Readonly<{
  type: ActionType.OpenDialogAddChannel;
}>;

export type CloseDialog = Readonly<{
  type: ActionType.CloseDialog;
}>;

export type OpenChannelsCatalogSection = Readonly<{
  type: ActionType.OpenChannelsCatalogSection;
}>;

export type OpenChannelSection = Readonly<{
  type: ActionType.OpenChannelSection;
  payload: {
    channelId: ChannelId;
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
  | GoToAuthenticationScreen
  | GoToChatScreen
  | OpenDialogAddChannel
  | CloseDialog
  | OpenChannelsCatalogSection
  | OpenChannelSection
  | AddSignedInUser
  | EditSectionRight
  | SignOutActiveUser;

export type Dispatcher = Dispatch<Action>;

//#endregion
