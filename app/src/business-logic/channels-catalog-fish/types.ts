import { Timestamp } from '@actyx/pond';
import { ChannelId } from '../message/types';
import { UserUUID } from '../users-catalog-fish/types';

//#region General

export type ChannelProfile = {
  channelId: ChannelId;
  createdOn: Timestamp;
  createdBy: UserUUID;
  editedOn?: Timestamp;
  editedBy?: UserUUID;
  isArchived: boolean;
  name: string;
  description?: string;
};

//#endregion

//#region Events

export enum ChannelsCatalogFishEventType {
  ChannelAdded = 'ChannelAdded',
  ChannelProfileEdited = 'ChannelProfileEdited',
  ChannelArchived = 'ChannelArchived',
  ChannelUnarchived = 'ChannelUnarchived',
  ChannelAssociatedUser = 'ChannelAssociatedUser',
  ChannelDissociatedUser = 'ChannelDissociatedUser',
}

export type ChannelAddedEvent = Readonly<{
  type: ChannelsCatalogFishEventType.ChannelAdded;
  payload: {
    channelId: ChannelId;
    createdBy: UserUUID;
    name: string;
    description?: string;
  };
}>;

export type ChannelProfileEditedEvent = Readonly<{
  type: ChannelsCatalogFishEventType.ChannelProfileEdited;
  payload: {
    channelId: ChannelId;
    editedBy: UserUUID;
    name: string;
    description?: string;
  };
}>;

export type ChannelArchivedEvent = Readonly<{
  type: ChannelsCatalogFishEventType.ChannelArchived;
  payload: {
    channelId: ChannelId;
    archivedBy: UserUUID;
  };
}>;

export type ChannelUnarchiveEvent = Readonly<{
  type: ChannelsCatalogFishEventType.ChannelUnarchived;
  payload: {
    channelId: ChannelId;
    unarchivedBy: UserUUID;
  };
}>;

export type ChannelAssociatedUserEvent = Readonly<{
  type: ChannelsCatalogFishEventType.ChannelAssociatedUser;
  payload: {
    channelId: ChannelId;
    userUUID: UserUUID;
  };
}>;

export type ChannelDissociatedUserEvent = Readonly<{
  type: ChannelsCatalogFishEventType.ChannelDissociatedUser;
  payload: {
    channelId: ChannelId;
    userUUID: UserUUID;
  };
}>;

export type ChannelsCatalogFishEvent =
  | ChannelAddedEvent
  | ChannelProfileEditedEvent
  | ChannelArchivedEvent
  | ChannelUnarchiveEvent
  | ChannelAssociatedUserEvent
  | ChannelDissociatedUserEvent;

//#endregion

//#region State

export type Channels = Record<
  ChannelId,
  { profile: ChannelProfile; users: UserUUID[] }
>;

export type ChannelsCatalogFishState = Readonly<{
  channels: Channels;
}>;

//#endregion
