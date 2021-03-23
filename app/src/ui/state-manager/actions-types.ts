import { Dispatch } from 'react';
import { ChannelId } from '../../business-logic/message/types';
import { UserUUID } from '../../business-logic/user-catalog-fish/types';
import { SectionRight } from './state-types';

export enum ActionType {
  GoToAuthenticationScreen = 'GoToAuthenticationScreen',
  GoToChatScreen = 'GoToChatScreen',
  AddSignedInUser = 'AddSignedInUser',
  EditSectionRight = 'EditSectionRight',
  SignOutActiveUser = 'SignOutActiveUser',
  ShowChannelsCatalogSection = 'ShowChannelsCatalogSection',
  ShowChannelSection = 'ShowChannelSection',
  ShowAddChannelDialog = 'ShowAddChannelDialog',
  ShowEditChannelDialog = 'ShowEditChannelDialog',
  HideDialog = 'HideDialog',
}

export type GoToAuthenticationScreen = Readonly<{
  type: ActionType.GoToAuthenticationScreen;
}>;

export type GoToChatScreen = Readonly<{
  type: ActionType.GoToChatScreen;
  payload: {
    userUUID: UserUUID;
  };
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

export type ShowAddChannelDialog = Readonly<{
  type: ActionType.ShowAddChannelDialog;
}>;

export type ShowEditChannelDialog = Readonly<{
  type: ActionType.ShowEditChannelDialog;
}>;

export type HideDialog = Readonly<{
  type: ActionType.HideDialog;
}>;

export type Action =
  | GoToAuthenticationScreen
  | GoToChatScreen
  | ShowChannelsCatalogSection
  | ShowChannelSection
  | AddSignedInUser
  | EditSectionRight
  | SignOutActiveUser
  | ShowAddChannelDialog
  | ShowEditChannelDialog
  | HideDialog;

export type Dispatcher = Dispatch<Action>;
