import { Pond } from '@actyx/pond';
import { isStringEmpty, prepareString } from '../../common/utility';
import { UserUUID } from '../users-catalog-fish/types';
import { getChannelAdded } from './events';
import { v4 as uuid } from 'uuid';
import { ChannelId } from '../message/types';
import { ChannelsCatalogFishState } from './types';
import { ChannelsCatalogFish } from './channels-catalog-fish';
import { isUserSignedIn } from '../channel-fish/logic';

export const doesChannelIdExist = (
  channelId: ChannelId,
  state: ChannelsCatalogFishState
) => channelId in state;

export const doesChannelNameExist = (
  name: string,
  state: ChannelsCatalogFishState
) => Object.values(state).some((c) => c.profile.name === name);

export const addChannel = (pond: Pond) => (
  signedInUserUUID: UserUUID
) => async (name: string, description: string): Promise<boolean> => {
  let isSuccess = false;
  if (isUserSignedIn(signedInUserUUID)) {
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
              signedInUserUUID,
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
