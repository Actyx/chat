import {
  mkErrorAutheticationUserIsNotSignIn,
  mkErrorMessageDoesNotExist,
  mkErrorMessageUserIsNotOwner,
} from '../../common/errors';
import { ChannelId, MessageId } from '../../message/types';
import { isSignedInUser } from '../../user-catalog-fish/logic/helpers';
import { UserUUID } from '../../user-catalog-fish/types';
import { getMessageContentEdited } from '../events';
import { doesMessageBelongToUser, getMessageById } from '../logic';
import { ChannelFishState, EditMessageInChannelResult } from '../types';

export const editMessageInChannel = (
  fishState: ChannelFishState,
  channelId: ChannelId,
  userUUID: UserUUID,
  messageId: MessageId,
  content: string
): EditMessageInChannelResult => {
  if (!isSignedInUser(userUUID)) {
    return mkErrorAutheticationUserIsNotSignIn();
  }
  const message = getMessageById(messageId, fishState.messages);
  if (!message) {
    return mkErrorMessageDoesNotExist(messageId);
  }
  if (!doesMessageBelongToUser(userUUID, message)) {
    return mkErrorMessageUserIsNotOwner(messageId, userUUID);
  }
  return {
    type: 'ok',
    tagsWithEvents: [
      getMessageContentEdited(messageId, channelId, content, userUUID),
    ],
    result: undefined,
  };
};
