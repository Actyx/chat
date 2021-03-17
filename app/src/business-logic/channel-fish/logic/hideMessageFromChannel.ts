import {
  mkErrorAutheticationUserIsNotSignIn,
  mkErrorMessageDoesNotExist,
  mkErrorMessageUserIsNotOwner,
} from '../../common/errors';
import { ChannelId, MessageId } from '../../message/types';
import { isSignedInUser } from '../../user-catalog-fish/logic/helpers';
import { UserUUID } from '../../user-catalog-fish/types';
import { getMessageHiddenEvent } from '../events';
import { getMessageById, doesMessageBelongToUser } from './logic-helpers';
import { ChannelFishState, HideMessageFromChannelResult } from '../types';

export const hideMessageFromChannel = (
  fishState: ChannelFishState,
  channelId: ChannelId,
  userUUID: UserUUID,
  messageId: MessageId
): HideMessageFromChannelResult => {
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
    tagsWithEvents: [getMessageHiddenEvent(messageId, channelId, userUUID)],
    result: undefined,
  };
};
