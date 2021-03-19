import {
  mkErrorAutheticationUserIsNotSignIn,
  mkErrorDoesChannelNameExist,
} from '../../common/errors';
import { LogicResult } from '../../common/logic-types';
import { ChannelId } from '../../message/types';
import { isSignedInUser } from '../../user-catalog-fish/logic/helpers';
import { Users, UserUUID } from '../../user-catalog-fish/types';
import { getChannelAdded } from '../events';
import {
  doesChannelNameExist,
  prepareContentChannelProfile,
} from '../logic-helpers';
import { ChannelAddedEvent, ChannelCatalogFishState } from '../types';

export const addChannel = (makerUUID: () => ChannelId) => (
  fishState: ChannelCatalogFishState,
  users: Users,
  userUUID: UserUUID,
  name: string,
  description: string
): LogicResult<ChannelAddedEvent> => {
  if (!isSignedInUser(userUUID, users)) {
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
