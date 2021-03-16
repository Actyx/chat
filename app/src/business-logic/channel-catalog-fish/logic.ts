import { Pond } from '@actyx/pond';
import { isStringEmpty, prepareString } from '../../common/strings';
import { SYSTEM_USER, UserUUID } from '../user-catalog-fish/types';
import {
  getChannelAdded,
  getChannelArchived,
  getChannelAssociatedUser,
  getChannelDissociatedUser,
  getChannelProfileEdited,
  getChannelUnarchived,
} from './events';
import { ChannelId } from '../message/types';
import {
  Channels,
  ChannelCatalogFishState,
  Users,
  AddChannelLogicResult,
  EditChannelLogicResult,
} from './types';
import { ChannelCatalogFish } from './channel-catalog-fish';
import { isSignedInUser } from '../user-catalog-fish/logic';
import { DEFAULT_CHANNEL } from '../channel-fish/channel-fish';
import {
  getChannelProfileByChannelId,
  isUserAssociatedToChannel,
} from './logic-helpers';
import { ErrorCode } from '../common/logic-types';
import { mkErrorAutheticationUserIsNotSignIn } from '../common/errors';

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

export const addChannelLogic = (makerUUID: () => ChannelId) => (
  fishState: ChannelCatalogFishState,
  userUUID: UserUUID,
  name: string,
  description: string
): AddChannelLogicResult => {
  if (!isSignedInUser(userUUID)) {
    return mkErrorAutheticationUserIsNotSignIn();
  }

  const { newName, newDescription } = prepareContentChannelProfile(
    name,
    description
  );
  if (doesChannelNameExist(newName, fishState)) {
    return {
      type: 'error',
      code: ErrorCode.ChannelAddChannelNameExist,
      message: 'The channel name has been already registered in the system',
    };
  }

  return {
    type: 'ok',
    tagsWithEvents: [
      getChannelAdded(makerUUID(), userUUID, newName, newDescription),
    ],
    result: undefined,
  };
};

export const editChannelLogic = (
  fishState: ChannelCatalogFishState,
  userUUID: UserUUID,
  channelId: ChannelId,
  name: string,
  description: string
): EditChannelLogicResult => {
  if (!isSignedInUser(userUUID)) {
    return mkErrorAutheticationUserIsNotSignIn();
  }
  const { newName, newDescription } = prepareContentChannelProfile(
    name,
    description
  );

  const profile = getChannelProfileByChannelId(channelId, fishState.channels);
  if (!profile) {
    return {
      type: 'error',
      code: ErrorCode.ChannelEditChannelProfileDoesNotExist,
      message: `Cannot edit channel because channel profile does not exists`,
    };
  }

  const isEditName = profile.name !== newName;
  const isEditDescription = profile.description !== newDescription;
  const isEditWithUniqueNameOnly =
    isEditName &&
    !isEditDescription &&
    !doesChannelNameExist(newName, fishState);
  const isEditWithDescriptionOnly = !isEditName && isEditDescription;

  const canEdit = isEditWithUniqueNameOnly || isEditWithDescriptionOnly;
  if (canEdit) {
    return {
      type: 'ok',
      tagsWithEvents: [
        getChannelProfileEdited(channelId, userUUID, newName, newDescription),
      ],
      result: undefined,
    };
  }

  return {
    type: 'error',
    code: ErrorCode.ChannelEditChannelNameExist,
    message: `Cannot edit channel because new name ${newName} already exists`,
  };
};

export const archiveChannel = (pond: Pond) => async (
  userUUID: UserUUID,
  channelId: ChannelId
): Promise<boolean> => {
  let isSuccess = false;
  if (isSignedInUser(userUUID)) {
    await pond
      .run(ChannelCatalogFish, (fishState, enqueue) => {
        const canArchive =
          hasUserCreatedChannel(userUUID, channelId, fishState.channels) &&
          isChannelIdRegistered(channelId, fishState.channels);
        if (canArchive) {
          enqueue(...getChannelArchived(channelId, userUUID));
          isSuccess = true;
        }
      })
      .toPromise();
  }
  return isSuccess;
};

export const unarchiveChannel = (pond: Pond) => async (
  userUUID: UserUUID,
  channelId: ChannelId
): Promise<boolean> => {
  let isSuccess = false;
  if (isSignedInUser(userUUID)) {
    await pond
      .run(ChannelCatalogFish, (fishState, enqueue) => {
        const canUnarchive =
          hasUserCreatedChannel(userUUID, channelId, fishState.channels) &&
          isChannelIdRegistered(channelId, fishState.channels);
        if (canUnarchive) {
          enqueue(...getChannelUnarchived(channelId, userUUID));
          isSuccess = true;
        }
      })
      .toPromise();
  }
  return isSuccess;
};

export const associateUserToChannel = (pond: Pond) => async (
  userUUID: UserUUID,
  channelId: ChannelId
): Promise<boolean> => {
  let isSuccess = false;
  if (isSignedInUser(userUUID)) {
    await pond
      .run(ChannelCatalogFish, (fishState, enqueue) => {
        const canAssociate =
          !isUserAssociatedToChannel(userUUID, channelId, fishState.channels) &&
          isChannelIdRegistered(channelId, fishState.channels);
        if (canAssociate) {
          enqueue(...getChannelAssociatedUser(channelId, userUUID));
          isSuccess = true;
        }
      })
      .toPromise();
  }
  return isSuccess;
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
