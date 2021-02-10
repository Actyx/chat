import { Reduce } from '@actyx/pond';
import {
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
      // TODO
      return state;
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
