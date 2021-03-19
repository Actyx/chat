import { isChannelIdRegistered } from '../../channel-catalog-fish/logic-helpers';
import { Channels } from '../../channel-catalog-fish/types';
import {
  mkErrorAutheticationUserIsNotSignIn,
  mkErrorChannelDoesNotExist,
} from '../../common/errors';
import { LogicResult } from '../../common/logic-types';
import {
  ChannelId,
  MediaIds,
  PublicMessageEvent,
  PublicRecipientIds,
} from '../../message/types';
import { isSignedInUser } from '../../user-catalog-fish/logic/helpers';
import { Users, UserUUID } from '../../user-catalog-fish/types';
import { getPublicMessageAdded } from '../events';
import { ChannelFishState } from '../types';

type AddMessageArgs = Readonly<{
  users: Users;
  channels: Channels;
  channelId: ChannelId;
  userUUID: UserUUID;
  content: string;
  mediaIds?: MediaIds;
  recipientIds?: PublicRecipientIds;
}>;
export const addMessageToChannel = (makerUUID: () => UserUUID) => (
  _fishState: ChannelFishState,
  {
    users,
    channels,
    channelId,
    userUUID,
    content,
    mediaIds,
    recipientIds,
  }: AddMessageArgs
): LogicResult<PublicMessageEvent> => {
  if (!isSignedInUser(userUUID, users)) {
    return mkErrorAutheticationUserIsNotSignIn();
  }
  if (!isChannelIdRegistered(channelId, channels)) {
    return mkErrorChannelDoesNotExist(channelId);
  }
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
