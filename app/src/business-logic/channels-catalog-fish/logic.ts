import { Pond } from '@actyx/pond';
import { isStringEmpty, trimString } from '../../common/utility';
import { UserUUID } from '../users-catalog-fish/types';
import { getChannelAdded } from './events';
import { v4 as uuid } from 'uuid';
import { ChannelId } from '../message/types';
import { ChannelsCatalogFishState } from './types';

export const isChannelAdded = (
  channelId: ChannelId,
  state: ChannelsCatalogFishState
) => channelId in state;

export const addChannel = (pond: Pond) => (userUUID: UserUUID) => (
  name: string,
  description: string
): Promise<void> => {
  const nameTrimmed = trimString(name);

  const descriptionTrimmed = isStringEmpty(description)
    ? undefined
    : trimString(description);

  const newChannelId = uuid();

  return pond
    .emit(
      ...getChannelAdded(
        newChannelId,
        userUUID,
        nameTrimmed,
        descriptionTrimmed
      )
    )
    .toPromise();
};
