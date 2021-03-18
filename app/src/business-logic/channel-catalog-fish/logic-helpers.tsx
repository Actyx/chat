import { isStringEmpty, prepareString } from '../../common/strings';
import { DEFAULT_CHANNEL } from '../channel-fish/channel-fish';
import { ChannelId } from '../message/types';
import { UserUUID } from '../user-catalog-fish/types';
import {
  ChannelCatalogFishState,
  ChannelProfile,
  Channels,
  Users,
} from './types';

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

export const isChannelIdRegistered = (
  channelId: ChannelId,
  channels: Channels
): boolean => channelId in channels;

export const isChannelIdSystemDefault = (channelId: ChannelId) =>
  channelId === DEFAULT_CHANNEL.channelId;

export const getChannelUsersByChannelId = (
  channelId: ChannelId,
  channels: Channels
): Users | undefined => channels[channelId]?.users;

export const doesChannelNameExist = (
  name: string,
  state: ChannelCatalogFishState
): boolean =>
  Object.values(state.channels).some(
    (c) => c.profile.name.trim().toLowerCase() === name.trim().toLowerCase()
  );

export const hasUserCreatedChannel = (
  userUUID: UserUUID,
  channelId: ChannelId,
  channels: Channels
): boolean => {
  const profile = getChannelProfileByChannelId(channelId, channels);
  if (profile) {
    return profile.createdBy === userUUID;
  }
  return false;
};

export const prepareContentChannelProfile = (
  name: string,
  description: string
): Readonly<{ newName: string; newDescription?: string }> => {
  const newName = prepareString(name);
  const newDescription = isStringEmpty(description)
    ? undefined
    : prepareString(description);
  return { newName, newDescription };
};
