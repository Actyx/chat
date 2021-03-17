import { isStringEmpty, prepareString } from '../../common/strings';
import { UserUUID } from '../user-catalog-fish/types';
import { ChannelId } from '../message/types';
import { Channels, ChannelCatalogFishState, Users } from './types';
import { DEFAULT_CHANNEL } from '../channel-fish/channel-fish';
import { getChannelProfileByChannelId } from './logic-helpers';

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
