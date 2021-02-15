import { Timestamp } from '@actyx/pond';
import { ChannelId } from '../message/types';
import { UserUUID } from '../users-catalog-fish/types';

//#region General

export type ChannelProfile = Readonly<{
  channelId: ChannelId;
  createdOn: Timestamp;
  editedOn?: Timestamp;
  createdBy: UserUUID;
  isArchived: boolean;
  name: string;
  description?: string;
}>;

//#endregion

//#region Events

export enum ChannelsCatalogFishEventType {
  ChannelAdded = 'ChannelAdded',
  ChannelProfileEdited = 'ChannelProfileEdited',
  ChannelArchived = 'ChannelArchived',
  ChannelUnarchive = 'ChannelUnarchive',
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
  type: ChannelsCatalogFishEventType.ChannelUnarchive;
  payload: {
    channelId: ChannelId;
    unarchivedBy: UserUUID;
  };
}>;

export type ChannelsCatalogFishEvent =
  | ChannelAddedEvent
  | ChannelProfileEditedEvent
  | ChannelArchivedEvent
  | ChannelUnarchiveEvent;

//#endregion

//#region State

export type ChannelsCatalogFishState = Readonly<
  Record<ChannelId, { profile: ChannelProfile; users: ReadonlyArray<UserUUID> }>
>;

//#endregion
