import { Reduce, Timestamp } from '@actyx/pond';
import {
  MessageEventType,
  PublicMessageAddedEvent,
  PublicMessageEvent,
} from '../message/types';
import { ChannelFishState } from './types';

export const reducer: Reduce<ChannelFishState, PublicMessageEvent> = (
  state,
  event,
  meta
): ChannelFishState => {
  switch (event.type) {
    case MessageEventType.PublicMessageAdded:
      return publicMessageAdded(state, event, meta.timestampMicros);
    case MessageEventType.MessageHidden:
      // TODO
      return state;
    case MessageEventType.MessageContentEdited:
      // TODO
      return state;
    case MessageEventType.PublicMessageRecipientsEdited:
      // TODO
      return state;
    case MessageEventType.MessageMediumEdited:
      // TODO
      return state;
    default:
      return state;
  }
};

const publicMessageAdded = (
  state: ChannelFishState,
  event: PublicMessageAddedEvent,
  timestampMicros: Timestamp
) => {
  const newMessage = {
    ...event.payload,
    createdOn: timestampMicros,
    isHidden: false,
  };
  state.messages.push(newMessage);
  return state;
};
