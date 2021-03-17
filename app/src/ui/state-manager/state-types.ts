import { ChannelId } from '../../business-logic/message/types';
import {
  AnonymousUser,
  UserUUID,
} from '../../business-logic/user-catalog-fish/types';

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

export type StateUI = Readonly<{
  screen: Screens;
  dialog: Dialogs;
  userUUID: UserUUID | AnonymousUser;
  sectionRight: SectionRight;
  sectionCenter: SectionCenter;
  activeChannelId: ChannelId;
}>;
