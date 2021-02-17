import { Reduce, Timestamp } from '@actyx/pond';
import { ChannelId } from '../message/types';
import { UserUUID } from '../users-catalog-fish/types';
import { doesChannelExist, hasUserCreatedChannel } from './logic';
import {
  ChannelAddedEvent,
  ChannelArchivedEvent,
  ChannelProfileEditedEvent,
  ChannelsCatalogFishEvent,
  ChannelsCatalogFishEventType,
  ChannelsCatalogFishState,
  ChannelUnarchiveEvent,
} from './types';

export const reducer: Reduce<
  ChannelsCatalogFishState,
  ChannelsCatalogFishEvent
> = (state, event, meta): ChannelsCatalogFishState => {
  switch (event.type) {
    case ChannelsCatalogFishEventType.ChannelAdded:
      return channelAdded(state, event, meta.timestampMicros);
    case ChannelsCatalogFishEventType.ChannelProfileEdited:
      return channelProfileEdited(state, event, meta.timestampMicros);
    case ChannelsCatalogFishEventType.ChannelArchived:
      return channelArchived(state, event, meta.timestampMicros);
    case ChannelsCatalogFishEventType.ChannelUnarchived:
      return channelUnarchived(state, event, meta.timestampMicros);
    case ChannelsCatalogFishEventType.ChannelAssociatedUser:
      //TODO
      return state;
    case ChannelsCatalogFishEventType.ChannelDissociatedUser:
      //TODO
      return state;
    default:
      return state;
  }
};

const channelAdded = (
  state: ChannelsCatalogFishState,
  event: ChannelAddedEvent,
  timestampMicros: Timestamp
) => {
  const { channelId, createdBy, name, description } = event.payload;
  const canAdd = doesChannelExist(channelId, state.channels) === false;
  if (canAdd) {
    const profile = {
      channelId,
      createdOn: timestampMicros,
      createdBy,
      isArchived: false,
      name,
      description,
    };
    state.channels[channelId] = {
      profile,
      users: [createdBy],
    };
  }
  return state;
};

const channelProfileEdited = (
  state: ChannelsCatalogFishState,
  event: ChannelProfileEditedEvent,
  timestampMicros: Timestamp
) => {
  const { channelId, editedBy, name, description } = event.payload;
  const canEdit = doesChannelExist(channelId, state.channels);
  if (canEdit) {
    state.channels[channelId].profile.editedBy = editedBy;
    state.channels[channelId].profile.editedOn = timestampMicros;
    state.channels[channelId].profile.name = name;
    state.channels[channelId].profile.description = description;
  }
  return state;
};

const channelArchived = (
  state: ChannelsCatalogFishState,
  event: ChannelArchivedEvent,
  timestampMicros: Timestamp
) => {
  state = handleArchiviation(
    event.payload.channelId,
    event.payload.archivedBy,
    state,
    timestampMicros,
    true
  );
  return state;
};

const channelUnarchived = (
  state: ChannelsCatalogFishState,
  event: ChannelUnarchiveEvent,
  timestampMicros: Timestamp
) => {
  state = handleArchiviation(
    event.payload.channelId,
    event.payload.unarchivedBy,
    state,
    timestampMicros,
    false
  );
  return state;
};

const handleArchiviation = (
  channelId: ChannelId,
  userUUID: UserUUID,
  state: ChannelsCatalogFishState,
  timestampMicros: number,
  isArchived: boolean
) => {
  const canProcess =
    doesChannelExist(channelId, state.channels) &&
    hasUserCreatedChannel(userUUID, channelId, state.channels);
  if (canProcess) {
    state.channels[channelId].profile.isArchived = isArchived;
    state.channels[channelId].profile.editedOn = timestampMicros;
    state.channels[channelId].profile.editedBy = userUUID;
  }
  return state;
};
