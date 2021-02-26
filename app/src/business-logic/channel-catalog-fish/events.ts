import { TagsWithEvent } from '../../common/types';
import { mkChannelTagWithId } from '../channel-fish/events';
import { ChannelId } from '../message/types';
import { channelCatalogTag } from '../tags/tags';
import { mkUserTagWithId } from '../user-catalog-fish/events';
import { UserUUID } from '../user-catalog-fish/types';
import {
  ChannelAddedEvent,
  ChannelArchivedEvent,
  ChannelAssociatedUserEvent,
  ChannelDissociatedUserEvent,
  ChannelProfileEditedEvent,
  ChannelCatalogFishEventType,
  ChannelUnarchiveEvent,
} from './types';

const mkChannelOperationTags = (channelId: ChannelId, userUUID: UserUUID) =>
  channelCatalogTag.and(
    mkChannelTagWithId(channelId).and(mkUserTagWithId(userUUID))
  );

export const getChannelAdded = (
  channelId: ChannelId,
  createdBy: UserUUID,
  name: string,
  description?: string
): TagsWithEvent<ChannelAddedEvent> => {
  const event: ChannelAddedEvent = {
    type: ChannelCatalogFishEventType.ChannelAdded,
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
    type: ChannelCatalogFishEventType.ChannelProfileEdited,
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
    type: ChannelCatalogFishEventType.ChannelArchived,
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
    type: ChannelCatalogFishEventType.ChannelUnarchived,
    payload: {
      channelId,
      unarchivedBy,
    },
  };
  const tags = mkChannelOperationTags(channelId, unarchivedBy);
  return [tags, event];
};

export const getChannelAssociatedUser = (
  channelId: ChannelId,
  userUUID: UserUUID
): TagsWithEvent<ChannelAssociatedUserEvent> => {
  const event: ChannelAssociatedUserEvent = {
    type: ChannelCatalogFishEventType.ChannelAssociatedUser,
    payload: {
      channelId,
      userUUID,
    },
  };
  const tags = mkChannelOperationTags(channelId, userUUID);
  return [tags, event];
};

export const getChannelDissociatedUser = (
  channelId: ChannelId,
  userUUID: UserUUID
): TagsWithEvent<ChannelDissociatedUserEvent> => {
  const event: ChannelDissociatedUserEvent = {
    type: ChannelCatalogFishEventType.ChannelDissociatedUser,
    payload: {
      channelId,
      userUUID,
    },
  };
  const tags = mkChannelOperationTags(channelId, userUUID);
  return [tags, event];
};
