import { mkErrorAutheticationUserIsNotSignIn } from '../../common/errors';
import { ChannelId, MediaIds, PublicRecipientIds } from '../../message/types';
import { isSignedInUser } from '../../user-catalog-fish/logic/helpers';
import { UserUUID } from '../../user-catalog-fish/types';
import { getPublicMessageAdded } from '../events';
import { ChannelFishState } from '../types';
import { AddMessageToChannelResult } from './logic-types';

type AddMessageArgs = Readonly<{
  channelId: ChannelId;
  userUUID: UserUUID;
  content: string;
  mediaIds?: MediaIds;
  recipientIds?: PublicRecipientIds;
}>;
export const addMessageToChannel = (makerUUID: () => UserUUID) => (
  _fishState: ChannelFishState,
  { channelId, userUUID, content, mediaIds, recipientIds }: AddMessageArgs
): AddMessageToChannelResult => {
  if (!isSignedInUser(userUUID)) {
    return mkErrorAutheticationUserIsNotSignIn();
  }
  // TODO add possibility to check multiple fishStates, in this case from ChannelCatalogFishState
  //   if (!isChannelIdRegistered(channelId, fishState.channels)) {
  //     return mkErrorChannelDoesNotExist(channelId);
  //   }
  const messageId = makerUUID();
  return {
    type: 'ok',
    tagsWithEvents: [
      getPublicMessageAdded({
        messageId,
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
