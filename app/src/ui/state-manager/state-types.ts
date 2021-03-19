import { ChannelId } from '../../business-logic/message/types';
import { UserUUID } from '../../business-logic/user-catalog-fish/types';

export enum Screens {
  Authentication = 'Authentication',
  Chat = 'Chat',
}

export enum Dialogs {
  None = 'None',
  AddChannel = 'AddChannel',
  EditChannel = 'EditChannel',
}

export enum SectionRight {
  None = 'None',
  UserProfileEdit = ' UserProfileEdit',
}

export enum SectionCenter {
  Channel = 'Channel',
  ChannelsCatalog = 'ChannelsCatalog',
}

export type StateUIAnonymous = Readonly<{
  type: 'anonymous';
  screen: Screens;
}>;

export type StateUIAuthenticated = Readonly<{
  type: 'autheticated';
  screen: Screens;
  dialog: Dialogs;
  userUUID: UserUUID;
  sectionRight: SectionRight;
  sectionCenter: SectionCenter;
  activeChannelId: ChannelId;
}>;

export type StateUI = StateUIAnonymous | StateUIAuthenticated;
