import { Reduce, Timestamp } from '@actyx/pond';
import { isChannelAdded as isChannelPresent } from './logic';
import {
  ChannelAddedEvent,
  ChannelsCatalogFishEvent,
  ChannelsCatalogFishEventType,
  ChannelsCatalogFishState,
} from './types';

export const reducer: Reduce<
  ChannelsCatalogFishState,
  ChannelsCatalogFishEvent
> = (state, event, meta): ChannelsCatalogFishState => {
  switch (event.type) {
    case ChannelsCatalogFishEventType.ChannelAdded:
      return channelAdded(state, event, meta.timestampMicros);
    case ChannelsCatalogFishEventType.ChannelProfileEdited:
      // TODO
      return state;
    case ChannelsCatalogFishEventType.ChannelArchived:
      // TODO
      return state;
    case ChannelsCatalogFishEventType.ChannelUnarchive:
      // TODO
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
  const canAdd = isChannelPresent(channelId, state) === false;
  if (canAdd) {
    const profile = {
      channelId,
      createdOn: timestampMicros,
      createdBy,
      isArchived: false,
      name,
      description,
    };
    state[channelId] = {
      profile,
      users: [createdBy],
    };
  }
  return state;
};
