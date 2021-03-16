import { mkErrorAutheticationUserIsNotSignIn } from '../../common/errors';
import { ErrorCode } from '../../common/logic-types';
import { ChannelId } from '../../message/types';
import { isSignedInUser } from '../../user-catalog-fish/logic/helpers';
import { UserUUID } from '../../user-catalog-fish/types';
import { getChannelAdded } from '../events';
import { doesChannelNameExist, prepareContentChannelProfile } from '../logic';
import { AddChannelLogicResult, ChannelCatalogFishState } from '../types';

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
    return {
      type: 'error',
      code: ErrorCode.ChannelAddChannelNameExist,
      message: `The channel name (${newName}) has been already registered in the system`,
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
