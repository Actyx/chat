import { Reduce, Timestamp } from '@actyx/pond';
import {
  MessageContentEditedEvent,
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
      return messageContentEdited(state, event, meta.timestampMicros);
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
  const message = {
    ...event.payload,
    createdOn: timestampMicros,
    isHidden: false,
  };
  state.messages.push(message);
  return state;
};

const messageContentEdited = (
  state: ChannelFishState,
  event: MessageContentEditedEvent,
  timestampMicros: Timestamp
) => {
  const { content, messageId } = event.payload;
  const message = state.messages.find((m) => m.messageId === messageId);
  if (message) {
    message.content = content;
    message.editedOn = timestampMicros;
  }
  return state;
};
