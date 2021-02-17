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

const mkChannelOperationTags = (channelId: ChannelId, userUUID: UserUUID) =>
  ChannelsCatalogFish.tags.channelsCatalog.and(
    mkChannelTagWithId(channelId).and(mkUserTagWithId(userUUID))
  );

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

  const tags = mkChannelOperationTags(channelId, createdBy);

  return [tags, event];
};

export const getChannelProfileEdited = (
  channelId: ChannelId,
  editedBy: UserUUID,
  name: string,
  description?: string
): TagsWithEvent<ChannelProfileEditedEvent> => {
  const event: ChannelProfileEditedEvent = {
    type: ChannelsCatalogFishEventType.ChannelProfileEdited,
    payload: {
      channelId,
      editedBy,
      name,
      description,
    },
  };

  const tags = mkChannelOperationTags(channelId, editedBy);

  return [tags, event];
};

export const getChannelArchived = (
  channelId: ChannelId,
  archivedBy: UserUUID
): TagsWithEvent<ChannelArchivedEvent> => {
  const event: ChannelArchivedEvent = {
    type: ChannelsCatalogFishEventType.ChannelArchived,
    payload: {
      channelId,
      archivedBy,
    },
  };
  const tags = mkChannelOperationTags(channelId, archivedBy);
  return [tags, event];
};

export const getChannelUnarchived = (
  channelId: ChannelId,
  unarchivedBy: UserUUID
): TagsWithEvent<ChannelUnarchiveEvent> => {
  const event: ChannelUnarchiveEvent = {
    type: ChannelsCatalogFishEventType.ChannelUnarchive,
    payload: {
      channelId,
      unarchivedBy,
    },
  };
  const tags = mkChannelOperationTags(channelId, unarchivedBy);
  return [tags, event];
};
