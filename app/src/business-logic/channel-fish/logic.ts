//#region Messages

import { Pond } from '@actyx/pond';
import {
  ChannelId,
  MediasIds,
  PublicRecipientsIds,
  SenderId,
} from '../message/types';
import { ChannelFish } from './channel-fish';
import { v4 as uuid } from 'uuid';
import { mkPublicMessageAddedEvent, mkPublicMessageAddedTags } from './events';

export const sendMessageToChannel = (pond: Pond) => (channelId: ChannelId) => (
  senderId: SenderId
) => ({
  content,
  mediasIds,
  recipientsIds,
}: Readonly<{
  content: string;
  mediasIds?: MediasIds;
  recipientsIds?: PublicRecipientsIds;
}>): Promise<boolean> => {
  return new Promise((res, rej) => {
    pond
      .run(ChannelFish.mainFish, (_, enqueue) => {
        const event = mkPublicMessageAddedEvent({
          messageId: uuid(),
          senderId,
          channelId,
          content,
          mediasIds,
          recipientsIds,
        });
        const tags = mkPublicMessageAddedTags(channelId, senderId);
        enqueue(tags, event);
      })
      .toPromise()
      .then(() => res(true))
      .catch(rej);
  });
};

//#endregion
