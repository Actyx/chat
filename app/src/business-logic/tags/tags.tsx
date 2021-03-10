import { Tag } from '@actyx/pond';
import { ChannelCatalogFishEvent } from '../channel-catalog-fish/types';
import { PublicMessageEvent } from '../message/types';
import { UserCatalogFishEvent } from '../user-catalog-fish/types';

export const channelTag = Tag<ChannelCatalogFishEvent>('channel');
export const channelCatalogTag = Tag<ChannelCatalogFishEvent>(
  'channel-catalog'
);

export const messagesCatalogTag = Tag<PublicMessageEvent>('messages-catalog');
export const messageTag = Tag<PublicMessageEvent>('message');
export const sender = Tag('sender');

export const userCatalogTag = Tag<UserCatalogFishEvent>('user-catalog');
export const userTag = Tag<UserCatalogFishEvent>('user');
