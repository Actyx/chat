import { Reduce, Timestamp } from '@actyx/pond';
import { doesChannelExist } from './logic';
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
    case ChannelsCatalogFishEventType.ChannelUnarchive:
      return channelUnarchived(state, event, meta.timestampMicros);
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
  const { channelId, archivedBy } = event.payload;
  const canEdit = doesChannelExist(channelId, state.channels);
  if (canEdit) {
    state.channels[channelId].profile.isArchived = true;
    state.channels[channelId].profile.editedOn = timestampMicros;
    state.channels[channelId].profile.editedBy = archivedBy;
  }
  return state;
};

const channelUnarchived = (
  state: ChannelsCatalogFishState,
  event: ChannelUnarchiveEvent,
  timestampMicros: Timestamp
) => {
  const { channelId, unarchivedBy } = event.payload;
  const canEdit = doesChannelExist(channelId, state.channels);
  if (canEdit) {
    state.channels[channelId].profile.isArchived = false;
    state.channels[channelId].profile.editedOn = timestampMicros;
    state.channels[channelId].profile.editedBy = unarchivedBy;
  }
  return state;
};
