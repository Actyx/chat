import {
  mkErrorAutheticationUserIsNotSignIn,
  mkErrorDoesChannelNameExist,
} from '../../common/errors';
import { ChannelId } from '../../message/types';
import { isSignedInUser } from '../../user-catalog-fish/logic/helpers';
import { UserUUID } from '../../user-catalog-fish/types';
import { getChannelAdded } from '../events';
import {
  doesChannelNameExist,
  prepareContentChannelProfile,
} from '../logic-helpers';
import { ChannelCatalogFishState } from '../types';
import { AddChannelLogicResult } from './logic-types';

export const addChannel = (makerUUID: () => ChannelId) => (
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
    return mkErrorDoesChannelNameExist(newName);
  }

  return {
    type: 'ok',
    tagsWithEvents: [
      getChannelAdded(makerUUID(), userUUID, newName, newDescription),
    ],
    result: undefined,
  };
};
