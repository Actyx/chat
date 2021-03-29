import { ChannelId } from '../../business-logic/message/types';
import { UserUUID } from '../../business-logic/user-catalog-fish/types';

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
}>;

export type StateUIAuthenticated = Readonly<{
  type: 'authenticated';
  dialog: Dialogs;
  userUUID: UserUUID;
  sectionRight: SectionRight;
  sectionCenter: SectionCenter;
  activeChannelId: ChannelId;
}>;

export type StateUI = StateUIAnonymous | StateUIAuthenticated;
