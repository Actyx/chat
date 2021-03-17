import { ChannelId } from '../message/types';
import { UserUUID } from '../user-catalog-fish/types';

export enum ChannelCatalogFishEventType {
  ChannelAdded = 'ChannelAdded',
  ChannelProfileEdited = 'ChannelProfileEdited',
  ChannelArchived = 'ChannelArchived',
  ChannelUnarchived = 'ChannelUnarchived',
  ChannelAssociatedUser = 'ChannelAssociatedUser',
  ChannelDissociatedUser = 'ChannelDissociatedUser',
}

export type ChannelAddedEvent = Readonly<{
  type: ChannelCatalogFishEventType.ChannelAdded;
  payload: {
    channelId: ChannelId;
    createdBy: UserUUID;
    name: string;
    description?: string;
  };
}>;

export type ChannelProfileEditedEvent = Readonly<{
  type: ChannelCatalogFishEventType.ChannelProfileEdited;
  payload: {
    channelId: ChannelId;
    editedBy: UserUUID;
    name: string;
    description?: string;
  };
}>;

export type ChannelArchivedEvent = Readonly<{
  type: ChannelCatalogFishEventType.ChannelArchived;
  payload: {
    channelId: ChannelId;
    archivedBy: UserUUID;
  };
}>;

export type ChannelUnarchiveEvent = Readonly<{
  type: ChannelCatalogFishEventType.ChannelUnarchived;
  payload: {
    channelId: ChannelId;
    unarchivedBy: UserUUID;
  };
}>;

export type ChannelAssociatedUserEvent = Readonly<{
  type: ChannelCatalogFishEventType.ChannelAssociatedUser;
  payload: {
    channelId: ChannelId;
    userUUID: UserUUID;
  };
}>;

export type ChannelDissociatedUserEvent = Readonly<{
  type: ChannelCatalogFishEventType.ChannelDissociatedUser;
  payload: {
    channelId: ChannelId;
    userUUID: UserUUID;
  };
}>;

export type ChannelCatalogFishEvent =
  | ChannelAddedEvent
  | ChannelProfileEditedEvent
  | ChannelArchivedEvent
  | ChannelUnarchiveEvent
  | ChannelAssociatedUserEvent
  | ChannelDissociatedUserEvent;
