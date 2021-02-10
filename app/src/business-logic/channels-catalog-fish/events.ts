import { ChannelId } from '../message/types';
import { UserUUID } from '../users-catalog-fish/types';
import {
  ChannelAddedEvent,
  ChannelArchivedEvent,
  ChannelProfileEditedEvent,
  ChannelsCatalogFishEventType,
  ChannelUnarchiveEvent,
} from './types';

export const mkChannelAddedEvent = (
  channelId: ChannelId,
  createdBy: UserUUID,
  name: string,
  description?: string
): ChannelAddedEvent => ({
  type: ChannelsCatalogFishEventType.ChannelAdded,
  payload: {
    channelId,
    createdBy,
    name,
    description,
  },
});

export const mkChannelProfileEditedEvent = (
  channelId: ChannelId,
  editedBy: UserUUID,
  name: string,
  description?: string
): ChannelProfileEditedEvent => ({
  type: ChannelsCatalogFishEventType.ChannelProfileEdited,
  payload: {
    channelId,
    editedBy,
    name,
    description,
  },
});

export const mkChannelArchivedEvent = (
  channelId: ChannelId,
  archivedBy: UserUUID
): ChannelArchivedEvent => ({
  type: ChannelsCatalogFishEventType.ChannelArchived,
  payload: {
    channelId,
    archivedBy,
  },
});

export const mkChannelUnarchiveEvent = (
  channelId: ChannelId,
  unarchivedBy: UserUUID
): ChannelUnarchiveEvent => ({
  type: ChannelsCatalogFishEventType.ChannelUnarchive,
  payload: {
    channelId,
    unarchivedBy,
  },
});
