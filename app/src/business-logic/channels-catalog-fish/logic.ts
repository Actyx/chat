import { Pond } from '@actyx/pond';
import { isStringEmpty, prepareString } from '../../common/utility';
import { UserUUID } from '../users-catalog-fish/types';
import {
  getChannelAdded,
  getChannelArchived,
  getChannelProfileEdited,
  getChannelUnarchived,
} from './events';
import { v4 as uuid } from 'uuid';
import { ChannelId } from '../message/types';
import { ChannelProfile, Channels, ChannelsCatalogFishState } from './types';
import { ChannelsCatalogFish } from './channels-catalog-fish';
import { isUserSignedIn } from '../channel-fish/logic';

export const doesChannelExist = (
  channelId: ChannelId,
  channels: Channels
): boolean => channelId in channels;

export const doesChannelNameExist = (
  name: string,
  state: ChannelsCatalogFishState
): boolean =>
  Object.values(state.channels).some((c) => c.profile.name === name);

export const getChannelProfileByChannelId = (
  channelId: ChannelId,
  channels: Channels
): ChannelProfile | undefined => channels[channelId].profile;

export const hasUserCreatedChannel = (
  userUUID: UserUUID,
  channelId: ChannelId,
  channels: Channels
): boolean => {
  const hasChannel = doesChannelExist(channelId, channels);
  if (hasChannel) {
    const profile = getChannelProfileByChannelId(channelId, channels);
    if (profile) {
      return profile.createdBy === userUUID;
    }
  }
  return false;
};

const prepareContentChannelProfile = (
  name: string,
  description: string
): Readonly<{ newName: string; newDescription?: string }> => {
  const newName = prepareString(name);
  const newDescription = isStringEmpty(description)
    ? undefined
    : prepareString(description);
  return { newName, newDescription };
};

export const isUserAssociatedToChannel = (
  userUUID: UserUUID,
  channelId: ChannelId,
  channels: Channels
): boolean =>
  doesChannelExist(channelId, channels)
    ? channels[channelId].users.includes(userUUID)
    : false;

export const addChannel = (pond: Pond) => (signedInUser: UserUUID) => async (
  name: string,
  description: string
): Promise<boolean> => {
  let isSuccess = false;
  if (isUserSignedIn(signedInUser)) {
    const { newName, newDescription } = prepareContentChannelProfile(
      name,
      description
    );

    const newChannelId = uuid();

    await pond
      .run(ChannelsCatalogFish.fish, (fishState, enqueue) => {
        const canAdd = doesChannelNameExist(newName, fishState) === false;
        if (canAdd) {
          enqueue(
            ...getChannelAdded(
              newChannelId,
              signedInUser,
              newName,
              newDescription
            )
          );
          isSuccess = true;
        }
      })
      .toPromise();
  }
  return isSuccess;
};

export const editChannel = (pond: Pond) => (
  signedInUser: UserUUID,
  channelId: ChannelId
) => async (name: string, description: string): Promise<boolean> => {
  let isSuccess = false;
  if (isUserSignedIn(signedInUser)) {
    const { newName, newDescription } = prepareContentChannelProfile(
      name,
      description
    );

    await pond
      .run(ChannelsCatalogFish.fish, (fishState, enqueue) => {
        const canEdit = doesChannelNameExist(newName, fishState) === false;
        if (canEdit) {
          enqueue(
            ...getChannelProfileEdited(
              channelId,
              signedInUser,
              newName,
              newDescription
            )
          );
          isSuccess = true;
        }
      })
      .toPromise();
  }
  return isSuccess;
};

export const archiveChannel = (pond: Pond) => async (
  signedInUser: UserUUID,
  channelId: ChannelId
): Promise<boolean> => {
  let isSuccess = false;
  if (isUserSignedIn(signedInUser)) {
    await pond
      .run(ChannelsCatalogFish.fish, (fishState, enqueue) => {
        const canArchive = hasUserCreatedChannel(
          signedInUser,
          channelId,
          fishState.channels
        );
        if (canArchive) {
          enqueue(...getChannelArchived(channelId, signedInUser));
          isSuccess = true;
        }
      })
      .toPromise();
  }
  return isSuccess;
};

export const unarchiveChannel = (pond: Pond) => async (
  signedInUser: UserUUID,
  channelId: ChannelId
): Promise<boolean> => {
  let isSuccess = false;
  if (isUserSignedIn(signedInUser)) {
    await pond
      .run(ChannelsCatalogFish.fish, (fishState, enqueue) => {
        const canArchive = hasUserCreatedChannel(
          signedInUser,
          channelId,
          fishState.channels
        );
        if (canArchive) {
          enqueue(...getChannelUnarchived(channelId, signedInUser));
          isSuccess = true;
        }
      })
      .toPromise();
  }
  return isSuccess;
};
