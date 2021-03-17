import { Pond } from '@actyx/pond';
import { isStringEmpty, prepareString } from '../../common/strings';
import { SYSTEM_USER, UserUUID } from '../user-catalog-fish/types';
import { getChannelAdded, getChannelDissociatedUser } from './events';
import { ChannelId } from '../message/types';
import { Channels, ChannelCatalogFishState, Users } from './types';
import { ChannelCatalogFish } from './channel-catalog-fish';
import { isSignedInUser } from '../user-catalog-fish/logic/helpers';
import { DEFAULT_CHANNEL } from '../channel-fish/channel-fish';
import {
  getChannelProfileByChannelId,
  isUserAssociatedToChannel,
} from './logic-helpers';

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

export const dissociateUserChannel = (pond: Pond) => async (
  userUUID: UserUUID,
  channelId: ChannelId
): Promise<boolean> => {
  let isSuccess = false;
  if (isSignedInUser(userUUID)) {
    await pond
      .run(ChannelCatalogFish, (fishState, enqueue) => {
        const canDissociate =
          isUserAssociatedToChannel(userUUID, channelId, fishState.channels) &&
          isChannelIdRegistered(channelId, fishState.channels);
        if (canDissociate) {
          enqueue(...getChannelDissociatedUser(channelId, userUUID));
          isSuccess = true;
        }
      })
      .toPromise();
  }
  return isSuccess;
};

export const addDefaultChannelIfDoesNotExist = (pond: Pond) => async (
  userUUID: UserUUID
): Promise<boolean> => {
  let isSuccess = false;
  if (isSignedInUser(userUUID)) {
    await pond
      .run(ChannelCatalogFish, (fishState, enqueue) => {
        const canAddDefault = !isChannelIdRegistered(
          DEFAULT_CHANNEL.channelId,
          fishState.channels
        );
        if (canAddDefault) {
          enqueue(
            ...getChannelAdded(
              DEFAULT_CHANNEL.channelId,
              SYSTEM_USER,
              DEFAULT_CHANNEL.name
            )
          );
          isSuccess = true;
        }
      })
      .toPromise();
  }
  return isSuccess;
};
