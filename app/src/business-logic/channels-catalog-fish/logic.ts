import { Pond } from '@actyx/pond';
import { isStringEmpty, prepareString } from '../../common/utility';
import { UserUUID } from '../users-catalog-fish/types';
import { getChannelAdded } from './events';
import { v4 as uuid } from 'uuid';
import { ChannelId } from '../message/types';
import { ChannelProfile, Channels, ChannelsCatalogFishState } from './types';
import { ChannelsCatalogFish } from './channels-catalog-fish';
import { isUserSignedIn } from '../channel-fish/logic';

export const doesChannelIdExist = (
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

export const isUserAssociatedToChannel = (
  userUUID: UserUUID,
  channelId: ChannelId,
  channels: Channels
): boolean =>
  doesChannelIdExist(channelId, channels)
    ? channels[channelId].users.includes(userUUID)
    : false;

export const addChannel = (pond: Pond) => (signedInUser: UserUUID) => async (
  name: string,
  description: string
): Promise<boolean> => {
  let isSuccess = false;
  if (isUserSignedIn(signedInUser)) {
    const newName = prepareString(name);
    const newDescription = isStringEmpty(description)
      ? undefined
      : prepareString(description);

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
