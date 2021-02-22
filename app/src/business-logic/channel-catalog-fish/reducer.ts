import { Reduce, Timestamp } from '@actyx/pond';
import { ChannelId } from '../message/types';
import { UserUUID } from '../user-catalog-fish/types';
import {
  getChannelProfileByChannelId,
  isUserAssociatedToChannel,
} from './logic';
import {
  ChannelAddedEvent,
  ChannelArchivedEvent,
  ChannelAssociatedUserEvent,
  ChannelDissociatedUserEvent,
  ChannelProfileEditedEvent,
  ChannelCatalogFishEvent,
  ChannelCatalogFishEventType,
  ChannelCatalogFishState,
  ChannelUnarchiveEvent,
} from './types';

export const reducer: Reduce<
  ChannelCatalogFishState,
  ChannelCatalogFishEvent
> = (state, event, meta): ChannelCatalogFishState => {
  switch (event.type) {
    case ChannelCatalogFishEventType.ChannelAdded:
      return channelAdded(state, event, meta.timestampMicros);
    case ChannelCatalogFishEventType.ChannelProfileEdited:
      return channelProfileEdited(state, event, meta.timestampMicros);
    case ChannelCatalogFishEventType.ChannelArchived:
      return channelArchived(state, event, meta.timestampMicros);
    case ChannelCatalogFishEventType.ChannelUnarchived:
      return channelUnarchived(state, event, meta.timestampMicros);
    case ChannelCatalogFishEventType.ChannelAssociatedUser:
      return channelAssociatedUser(state, event);
    case ChannelCatalogFishEventType.ChannelDissociatedUser:
      return channelDissociatedUser(state, event);
    default:
      return state;
  }
};

const channelAdded = (
  state: ChannelCatalogFishState,
  event: ChannelAddedEvent,
  timestampMicros: Timestamp
) => {
  const { channelId, createdBy, name, description } = event.payload;
  const canAdd = !getChannelProfileByChannelId(channelId, state.channels);
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
  state: ChannelCatalogFishState,
  event: ChannelProfileEditedEvent,
  timestampMicros: Timestamp
) => {
  const { channelId, editedBy, name, description } = event.payload;
  state.channels[channelId].profile.editedBy = editedBy;
  state.channels[channelId].profile.editedOn = timestampMicros;
  state.channels[channelId].profile.name = name;
  state.channels[channelId].profile.description = description;
  return state;
};

const channelArchived = (
  state: ChannelCatalogFishState,
  event: ChannelArchivedEvent,
  timestampMicros: Timestamp
) => {
  state = handleArchiving(
    event.payload.channelId,
    event.payload.archivedBy,
    state,
    timestampMicros,
    true
  );
  return state;
};

const channelUnarchived = (
  state: ChannelCatalogFishState,
  event: ChannelUnarchiveEvent,
  timestampMicros: Timestamp
) => {
  state = handleArchiving(
    event.payload.channelId,
    event.payload.unarchivedBy,
    state,
    timestampMicros,
    false
  );
  return state;
};

const handleArchiving = (
  channelId: ChannelId,
  userUUID: UserUUID,
  state: ChannelCatalogFishState,
  timestampMicros: number,
  isArchived: boolean
) => {
  state.channels[channelId].profile.isArchived = isArchived;
  state.channels[channelId].profile.editedOn = timestampMicros;
  state.channels[channelId].profile.editedBy = userUUID;
  return state;
};

const channelAssociatedUser = (
  state: ChannelCatalogFishState,
  event: ChannelAssociatedUserEvent
) => {
  const { channelId, userUUID } = event.payload;
  const canProcess =
    getChannelProfileByChannelId(channelId, state.channels) &&
    !isUserAssociatedToChannel(userUUID, channelId, state.channels);
  if (canProcess) {
    state.channels[channelId].users.push(userUUID);
  }
  return state;
};

const channelDissociatedUser = (
  state: ChannelCatalogFishState,
  event: ChannelDissociatedUserEvent
) => {
  const { channelId, userUUID } = event.payload;
  const canProcess =
    getChannelProfileByChannelId(channelId, state.channels) &&
    isUserAssociatedToChannel(userUUID, channelId, state.channels);
  if (canProcess) {
    const { users } = state.channels[channelId];
    state.channels[channelId].users = users.filter((x) => x !== userUUID);
  }
  return state;
};
