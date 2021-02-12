import { AddEmission, Tags } from '@actyx/pond';
import { TagsWithEvent } from '../../common/utility-types';
import {
  ChannelId,
  MessageContentEditedEvent,
  MessageEventType,
  MessageHiddenEvent,
  MessageId,
  PublicMessageAddedEvent,
  PublicMessageAddedEventPaylod,
  PublicMessageEvent,
} from '../message/types';
import { UserUUID } from '../users-catalog-fish/types';
import { ChannelFish } from './channel-fish';

export const getPublicMessageAdded = (
  payload: PublicMessageAddedEventPaylod
): TagsWithEvent<PublicMessageEvent> => {
  const event: PublicMessageAddedEvent = {
    type: MessageEventType.PublicMessageAdded,
    payload,
  };
  const tags = ChannelFish.tags.message.and(
    ChannelFish.tags.channel
      .withId(payload.channelId)
      .and(mkSenderTag(payload.senderId))
  );
  return [tags, event];
};

export const mkSenderTag = (senderId: UserUUID) =>
  ChannelFish.tags.sender.withId(senderId);

export const emitMessageContentEdited = (
  enqueue: AddEmission<PublicMessageEvent>
) => (messageId: MessageId, channelId: ChannelId, content: string) => {
  const event: MessageContentEditedEvent = {
    type: MessageEventType.MessageContentEdited,
    payload: {
      messageId,
      content,
    },
  };
  const tags: Tags<PublicMessageEvent> = ChannelFish.tags.message.and(
    ChannelFish.tags.channel.withId(channelId)
  );
  enqueue(tags, event);
};

export const emitMessageHiddenEvent = (
  enqueue: AddEmission<PublicMessageEvent>
) => (messageId: MessageId, channelId: ChannelId) => {
  const event: MessageHiddenEvent = {
    type: MessageEventType.MessageHidden,
    payload: {
      messageId,
    },
  };
  const tags: Tags<PublicMessageEvent> = ChannelFish.tags.message.and(
    ChannelFish.tags.channel.withId(channelId)
  );
  enqueue(tags, event);
};
