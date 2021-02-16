import { TagsWithEvent } from '../../common/types';
import { mkChannelTagWithId } from '../channel-fish/events';
import { ChannelId } from '../message/types';
import { mkUserTagWithId } from '../users-catalog-fish/events';
import { UserUUID } from '../users-catalog-fish/types';
import { ChannelsCatalogFish } from './channels-catalog-fish';
import {
  ChannelAddedEvent,
  ChannelArchivedEvent,
  ChannelProfileEditedEvent,
  ChannelsCatalogFishEventType,
  ChannelUnarchiveEvent,
} from './types';

const mkChannelOperationTag = (channelId: ChannelId, userUUID: UserUUID) =>
  mkChannelTagWithId(channelId).and(mkUserTagWithId(userUUID));

export const getChannelAdded = (
  channelId: ChannelId,
  createdBy: UserUUID,
  name: string,
  description?: string
): TagsWithEvent<ChannelAddedEvent> => {
  const event: ChannelAddedEvent = {
    type: ChannelsCatalogFishEventType.ChannelAdded,
    payload: {
      channelId,
      createdBy,
      name,
      description,
    },
  };

  const tags = ChannelsCatalogFish.tags.channelsCatalog.and(
    mkChannelOperationTag(channelId, createdBy)
  );
  return [tags, event];
};

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
