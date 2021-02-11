import { Reduce, Timestamp } from '@actyx/pond';
import {
  MessageContentEditedEvent,
  MessageEventType,
  MessageHiddenEvent,
  MessageId,
  PublicMessageAddedEvent,
  PublicMessageEvent,
} from '../message/types';
import { ChannelFishState, PublicMessages } from './types';

export const reducer: Reduce<ChannelFishState, PublicMessageEvent> = (
  state,
  event,
  meta
): ChannelFishState => {
  switch (event.type) {
    case MessageEventType.PublicMessageAdded:
      return publicMessageAdded(state, event, meta.timestampMicros);
    case MessageEventType.MessageHidden:
      return messageHidden(state, event, meta.timestampMicros);
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
  const message = findMessageByMessageId(messageId, state.messages);
  if (message) {
    message.content = content;
    message.editedOn = timestampMicros;
  }
  return state;
};

const messageHidden = (
  state: ChannelFishState,
  event: MessageHiddenEvent,
  timestampMicros: Timestamp
) => {
  const { messageId } = event.payload;
  const message = findMessageByMessageId(messageId, state.messages);
  if (message) {
    message.isHidden = true;
    message.editedOn = timestampMicros;
  }
  return state;
};

const findMessageByMessageId = (
  messageId: MessageId,
  messages: PublicMessages
) => messages.find((m) => m.messageId === messageId);
