import { mkErrorAutheticationUserIsNotSignIn } from '../../common/errors';
import { mkUUID } from '../../common/util';
import { ChannelId, MediaIds, PublicRecipientIds } from '../../message/types';
import { isSignedInUser } from '../../user-catalog-fish/logic/helpers';
import { UserUUID } from '../../user-catalog-fish/types';
import { getPublicMessageAdded } from '../events';
import { AddMessageToChannelResult, ChannelFishState } from '../types';

export const addMessageToChannelLogic = (
  fishState: ChannelFishState,
  channelId: ChannelId,
  userUUID: UserUUID,
  content: string,
  mediaIds?: MediaIds,
  recipientIds?: PublicRecipientIds
): AddMessageToChannelResult => {
  if (!isSignedInUser(userUUID)) {
    return mkErrorAutheticationUserIsNotSignIn();
  }
  // TODO add possibility to check multiple fishStates, in this case from ChannelCatalogFishState
  //   if (!isChannelIdRegistered(channelId, fishState.channels)) {
  //     return mkErrorChannelDoesNotExist(channelId);
  //   }
  return {
    type: 'ok',
    tagsWithEvents: [
      getPublicMessageAdded({
        messageId: mkUUID(),
        createdBy: userUUID,
        channelId,
        content,
        mediaIds,
        recipientIds,
      }),
    ],
    result: undefined,
  };
};
