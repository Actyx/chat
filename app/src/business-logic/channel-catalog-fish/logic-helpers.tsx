import { ChannelId } from '../message/types';
import { UserUUID } from '../user-catalog-fish/types';
import { ChannelProfile, Channels } from './types';

export const isUserAssociatedToChannel = (
  userUUID: UserUUID,
  channelId: ChannelId,
  channels: Channels
): boolean => {
  return getChannelProfileByChannelId(channelId, channels)
    ? channels[channelId].users.includes(userUUID)
    : false;
};

export const getChannelProfileByChannelId = (
  channelId: ChannelId,
  channels: Channels
): ChannelProfile | undefined => channels[channelId]?.profile;
